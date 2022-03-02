import {LicenseManager}                                                                                  from "@ag-grid-enterprise/all-modules";
import type {ColumnApi, BaseExportParams, GridOptions, ProcessCellForExportParams, ValueFormatterParams} from "ag-grid-community";
import type {RowNode}                                                                                    from "ag-grid-community/dist/lib/entities/rowNode";
import type {ColumnGroupOpenedEvent, GridReadyEvent, ModelUpdatedEvent, SelectionChangedEvent}           from "ag-grid-community/dist/lib/events";
import type {GridApi}                                                                                    from "ag-grid-community/dist/lib/gridApi";
import type {ProcessHeaderForExportParams, ShouldRowBeSkippedParams}                                     from "ag-grid-community/dist/lib/interfaces/exportParams";
import type {StatusPanelDef}                                                                             from "ag-grid-community/dist/lib/interfaces/iStatusPanel";
import {AgGridReact}                                                                                     from "ag-grid-react";
import React, {useEffect, useState}                                                                      from "react";
import {Size, SizeHelper}                                                                                from "recwhale-react-bootstrap";
import {StatusBarComp}                                                                                   from "./built";
import {AgCol}                                                                                           from "./columns";
import type {AgGetContextMenuItemsParams, AgMenuItemDef}                                                 from "./context";
import {AgContext}                                                                                       from "./context";
import "ag-grid-enterprise";
import "./Ag.scss";

LicenseManager.setLicenseKey("your license key");

export interface IAgGridReactProps extends GridOptions {
    rowData: any[];
    isLoading?: boolean;
    initSelectedRows?: (row: RowNode) => boolean;
    onSelectedRows?: (rows: RowNode[]) => void;
    useDynamicCols?: boolean;
    size?: Size;
    cellClassRules?: Record<string, (Function | string)>; // eslint-disable-line @typescript-eslint/ban-types
    editable?: boolean;
    useSearch?: boolean;
    exportFileName?: string;
    exportLite?: boolean;
    onAgApi?: (agApi: any) => void;
    onColumnApi?: (columnApi: ColumnApi) => void;
    condensed?: boolean;
}

export const Ag: React.FC<IAgGridReactProps> = (props) => {
    const [agApi, setAgApi]           = useState<GridApi>();
    const [searchText, setSearchText] = useState<string>("");

    useEffect(() => {
        if (agApi == null)
            return;
        props.isLoading === true ? agApi.showLoadingOverlay() : agApi.hideOverlay();
    }, [agApi, props.isLoading]);

    useEffect(() => {
        if (agApi == null)
            return;

        if (props.initSelectedRows) {
            const selector = props.initSelectedRows;
            agApi.forEachNode((node: RowNode) => {
                const isSelected = selector(node.data);
                node.setSelected(isSelected);
            });
        }

        if (props.useDynamicCols && props.rowData.length) {
            const colDefs = AgCol.buildColDefs(props);
            agApi.setColumnDefs(colDefs);
        }

        agApi.resetRowHeights();

    }, [agApi, props.rowData]); // eslint-disable-line react-hooks/exhaustive-deps

    function onSelectionChanged(event: SelectionChangedEvent) {
        if (props.onSelectedRows) {
            const rows = event.api.getSelectedRows();
            props.onSelectedRows(rows);
        }
    }

    //region Size event
    function onGridReady(params: GridReadyEvent) {
        setAgApi(params.api);
        props.onAgApi?.(params.api);
        props.onColumnApi?.(params.columnApi);
        params.api.sizeColumnsToFit();
        window.addEventListener("resize", () => params.api.sizeColumnsToFit());
    }

    const onModelUpdated      = (params: ModelUpdatedEvent) => params.api.sizeColumnsToFit();
    const onColumnGroupOpened = (params: ColumnGroupOpenedEvent) => params.api.sizeColumnsToFit();

    //endregion

    const defaultExportParams: BaseExportParams = {
        allColumns:            true,
        columnGroups:          true,
        shouldRowBeSkipped:    (params: ShouldRowBeSkippedParams) => params.node.group ?? false,
        fileName:              props.exportFileName ?? "export",
        processHeaderCallback: (params: ProcessHeaderForExportParams): string => {
            // TODO: rework this
            const def  = params.column.getColDef();
            const name = def.headerName ?? def.field ?? "";
            return name.replace("%", "").replace("()", "");
        },
        processCellCallback:   (params: ProcessCellForExportParams) => {
            const colDef = params.column.getColDef();

            if (params.node && colDef.type == "date") {
                const valueFormatterParams: ValueFormatterParams = {
                    ...params,
                    data:   params.node.data, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
                    node:   params.node,
                    colDef: colDef
                };
                return (colDef.valueFormatter as (params: ValueFormatterParams) => string)(valueFormatterParams);
            }

            return params.value as string;
        }
    };

    function getContextMenuItemsLite(params: AgGetContextMenuItemsParams): (string | AgMenuItemDef)[] {
        return [
            AgContext.ExcelLite(params.api!, defaultExportParams.fileName!),
            AgContext.ExcelFull(params.api!, defaultExportParams.fileName!)
        ];
    }

    // TODO: test selection
    // function onRangeSelectionChanged(event: any) {
    //     console.log(event);
    //     const api = event.api as GridApi;
    //     console.log(api.getSelectedRows());
    //     console.log(api.getSelectedNodes());
    //     console.log(api.getCellRanges());
    // }

    const statusPanels: StatusPanelDef[] = [
        {statusPanel: StatusBarComp.TotalAndFiltered, align: "left"},
        {statusPanel: StatusBarComp.Selected, align: "center"},
        {statusPanel: StatusBarComp.Aggregation, align: "right"}
    ];
    const statusBar = {statusPanels};

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const defaultGroupSortComparator = (nodeA: RowNode, nodeB: RowNode) => nodeA.key?.localeCompare(nodeB.key);

    const style: Record<string, any> = {};
    if (props.size)
        style.height = SizeHelper.height(props.size);

    let theme = "ag-theme-alpine";
    let size  = {};
    if (props.condensed !== false) {
        theme += " ag-theme-condensed";
        size = {
            headerHeight:           32,
            groupHeaderHeight:      32,
            floatingFiltersHeight:  32,
            pivotHeaderHeight:      32,
            pivotGroupHeaderHeight: 32,
            rowHeight:              24
        };
    }

    return (
        <div className={`ag-table ${theme}`} style={style}>
            {props.useSearch && <input type="text" placeholder="search..." className="form-control search" onChange={e => setSearchText(e.target.value)}/>}

            <AgGridReact {...AgCol.buildProps(props)}
                         {...size}

                         suppressPropertyNamesCheck
                         onGridReady={onGridReady}
                         onModelUpdated={onModelUpdated}
                         onColumnGroupOpened={onColumnGroupOpened}

                         quickFilterText={searchText}

                         statusBar={statusBar}
                         tooltipShowDelay={0}
                         disableStaticMarkup
                         animateRows={false}

                         rowSelection="multiple"
                         onSelectionChanged={onSelectionChanged}
                         enableRangeSelection
                // onRangeSelectionChanged={onRangeSelectionChanged}
                // suppressRowClickSelection={true}

                         groupSelectsFiltered
                         groupSuppressAutoColumn
                         groupUseEntireRow
                         groupRemoveLowestSingleChildren={false}
                         groupDefaultExpanded={-1}
                         defaultGroupSortComparator={defaultGroupSortComparator}

                         suppressCopyRowsToClipboard
                         suppressAggFuncInHeader
                         suppressDragLeaveHidesColumns
                         suppressMakeColumnVisibleAfterUnGroup
                         rowGroupPanelShow="onlyWhenGrouping"
                         rememberGroupStateWhenNewData

                         getContextMenuItems={props.exportLite ? getContextMenuItemsLite : undefined}
                         defaultExportParams={defaultExportParams}

                         {...props}
            />
        </div>
    );
};
