import {LicenseManager}                                                                                  from "@ag-grid-enterprise/core";
import {agThemeSgBootstrapCondensed}                                                                     from "@sg-bootstrap/ag-grid";
import type {ColumnApi, BaseExportParams, GridOptions, ProcessCellForExportParams, ValueFormatterParams} from "ag-grid-community";
import type {RowNode}                                                                                    from "ag-grid-community/dist/lib/entities/rowNode";
import type {ColumnGroupOpenedEvent, GridReadyEvent, ModelUpdatedEvent, SelectionChangedEvent}           from "ag-grid-community/dist/lib/events";
import type {GridApi}                                                                                    from "ag-grid-community/dist/lib/gridApi";
import type {ProcessHeaderForExportParams, ShouldRowBeSkippedParams}                                     from "ag-grid-community/dist/lib/interfaces/exportParams";
import type {StatusPanelDef}                                                                             from "ag-grid-community/dist/lib/interfaces/iStatusPanel";
import {AgGridReact}                                                                                     from "ag-grid-react";
import {isMoment}                                                                                        from "moment";
import React, {useEffect, useState}                                                                      from "react";
import {Form}                                                                                            from "react-bootstrap";
import type {Size}                                                                                       from "../Size";
import {SizeHelper}                                                                                      from "../Size";
import {StatusBarComp}                                                                                   from "./BuiltIn";
import {AgCol}                                                                                           from "./columns/AgCol";
import type {AgGetContextMenuItemsParams, AgMenuItemDef}                                                 from "./context";
import {AgContext}                                                                                       from "./context";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.min.css";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.min.css";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-theme-alpine.min.css";
// import "@sg-bootstrap/ag-grid/dist/theme-standard.min.css";
import "./Ag.scss";

LicenseManager.setLicenseKey("your license key");

export interface IAgGridReactSGProps extends GridOptions {
    rowData: any[];
    isLoading?: boolean;
    initSelectedRows?: (row: RowNode) => boolean;
    onSelectedRows?: (rows: RowNode[]) => void;
    useDynamicCols?: boolean;
    size?: Size;
    showRowCount?: boolean;
    cellClassRules?: Record<string, (Function | string)>; // eslint-disable-line @typescript-eslint/ban-types
    editable?: boolean;
    useSearch?: boolean;
    exportFileName?: string;
    exportLite?: boolean;
    onAgApi?: (agApi: any) => void;
    onColumnApi?: (columnApi: ColumnApi) => void;
}

export const Ag: React.FC<IAgGridReactSGProps> = (props) => {
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

        // TODO: fix search
        // agApi.forEachNode(function (rowNode: any, index: number) {
        //     console.log("Row " + index + " quick filter text is " + rowNode.quickFilterAggregateText);
        // });

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
            // TODO: rework this: use excel styles
            const colDef = params.column.getColDef();
            if (!params.node || !colDef.valueFormatter || !isMoment(params.value))
                return params.value as string;

            const valueFormatterParams: ValueFormatterParams = {
                ...params,
                data:   params.node.data, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
                node:   params.node,
                colDef: colDef
            };
            return (colDef.valueFormatter as (params: ValueFormatterParams) => string)(valueFormatterParams);
        }
    };

    function getContextMenuItemsLite(params: AgGetContextMenuItemsParams): (string | AgMenuItemDef)[] {
        return [
            AgContext.ExcelLite(params.api!, defaultExportParams.fileName!),
            AgContext.ExcelFull(params.api!, defaultExportParams.fileName!)
        ];
    }

    // should we use this?
    // const excelStyles = [{id: "dateType", dataType: "dateTime"}];

    // TODO: test selection
    // function onRangeSelectionChanged(event: any) {
    //     console.log(event);
    //     const api = event.api as GridApi;
    //     console.log(api.getSelectedRows());
    //     console.log(api.getSelectedNodes());
    //     console.log(api.getCellRanges());
    // }

    const statusBar = props.showRowCount
                      ? {statusPanels: [{statusPanel: StatusBarComp.Total, align: "left"}] as StatusPanelDef[]}
                      : undefined;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const defaultGroupSortComparator = (nodeA: RowNode, nodeB: RowNode) => nodeA.key?.localeCompare(nodeB.key);

    const style: Record<string, any> = {};
    if (props.size)
        style.height = SizeHelper.height(props.size);

    const theme = "ag-theme-alpine ag-theme-sg-bootstrap ag-theme-sg-bootstrap-condensed";

    agThemeSgBootstrapCondensed.headerHeight = 28;

    return (
        <div className={`ag-table ${theme}`} style={style}>
            {props.useSearch && <Form.Control type="text" placeholder="search..." onChange={e => setSearchText(e.target.value)}/>}

            <AgGridReact {...AgCol.buildProps(props)}

                         {...agThemeSgBootstrapCondensed}
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
