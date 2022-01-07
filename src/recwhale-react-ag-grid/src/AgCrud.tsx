import {faCopy, faPlus, faSortAmountUp, faSync, faTrash, faUndo}      from "@fortawesome/free-solid-svg-icons";
import type {CellClassParams, GridApi, GridOptions, RowNode}          from "ag-grid-community";
import type {AgGridEvent, CellValueChangedEvent, RowDataUpdatedEvent} from "ag-grid-community/dist/lib/events";
import _                                                              from "lodash";
import React, {useEffect, useRef, useState}                           from "react";
import type {IModalConfirmRef}                                        from "../modal";
import {ModalConfirm}                                                 from "../modal";
import {Ag}                                                           from "./Ag";
import {CellClass}                                                    from "./BuiltInExtended";
import type {AgGetContextMenuItemsParams, AgMenuItemDef}              from "./context";
import {AgContext}                                                    from "./context";

export class Item {
    constructor(
        public _new: boolean              = false,
        public _initial: Map<string, any> = new Map<string, any>(),
        public _hasDuplicateKey: boolean  = false
    ) {
    }

    static from<T>(obj: T): Item {
        return _.assign(obj, new Item());
    }

    static duplicate<T extends Item>(item: T): T {
        const dup            = _.cloneDeep(item);
        dup._new             = true;
        dup._initial         = new Map<string, any>();
        dup._hasDuplicateKey = true;
        return dup;
    }
}

export interface IAgCrudProps extends GridOptions {
    refresh: () => Promise<any[]>;
    exportFileName?: string;
}

interface IAgCrudContext {
    deletedRows: Item[];
    setDeletedRows: React.Dispatch<React.SetStateAction<Item[]>>;
}

export const AgCrud: React.FC<IAgCrudProps> = (props) => {

    const [rows, setRows]           = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {refresh().then();}, []); // eslint-disable-line react-hooks/exhaustive-deps

    async function refresh() {
        setIsLoading(true);
        const data = await props.refresh();
        const rows = data.map(Item.from);
        setRows(rows);
        setIsLoading(false);
    }

    //region Cell editing
    const key = "id";

    const cellClassRules = {
        [CellClass.Updated]: (params: CellClassParams) => (params.data as Item | undefined)?._initial.has(params.colDef.field ?? ""),
        [CellClass.Danger]:  (params: CellClassParams) => (params.data as Item | undefined)?._hasDuplicateKey && params.colDef.field === key
    };
    const getRowClass    = (params: CellClassParams) => (params.data as Item | undefined)?._new ? CellClass.Updated : "";

    function onCellValueChanged(event: CellValueChangedEvent) {
        if (event.newValue === event.oldValue)
            return;

        const field = event.colDef.field ?? "";
        const item  = event.node.data as Item;

        if (!item._initial.has(field))
            item._initial.set(field, event.oldValue);

        // use '==' for null & undefined
        // eslint-disable-next-line eqeqeq
        else if (item._initial.get(field) == event.newValue)
            item._initial.delete(field);

        event.api.refreshCells({rowNodes: [event.node], columns: [field]});

        if (event.colDef.field === key)
            checkDuplicateKey(event);

        if (event.colDef.autoHeight)
            event.api.resetRowHeights();
    }

    function onRowDataUpdated(event: RowDataUpdatedEvent) {
        checkDuplicateKey(event);
    }

    function checkDuplicateKey(event: AgGridEvent) {
        const agApi      = event.api;
        const itemsByKey = getNodes(agApi).mapStrict(n => n.data as Item)
                                          .groupBy(x => (x as Record<string, any>)[key]); // eslint-disable-line @typescript-eslint/no-unsafe-return
        itemsByKey.forEach(g => g.forEach(x => x._hasDuplicateKey = g.length > 1));
        agApi.refreshCells({columns: [key]});
    }

    // TODO: move to extension method
    function getNodes(agApi: GridApi): RowNode[] {
        const nodes: RowNode[] = [];
        agApi.forEachNode(node => nodes.push(node));
        return nodes;
    }

    //endregion

    //region Context menu
    const refModal                      = useRef<IModalConfirmRef>(null);
    const [deletedRows, setDeletedRows] = useState<Item[]>([]);

    function getContextMenuItems(params: AgGetContextMenuItemsParams): (string | AgMenuItemDef)[] {
        const agApi       = params.api;
        const agColumnApi = params.columnApi;
        const context     = params.context as IAgCrudContext | undefined;
        if (!agApi || !agColumnApi || !context)
            return [];

        const selectedRows = agApi.getSelectedRows();
        const info         = `(${selectedRows.length} selected)`;
        const add          = () => agApi.applyTransaction({add: [new Item(true)]});
        const dup          = () => agApi.applyTransaction({add: selectedRows.map((r: any) => Item.duplicate(r))}); // eslint-disable-line @typescript-eslint/no-unsafe-return
        const sor          = () => agApi.onSortChanged();
        const ref          = () => refModal.current?.open();

        const del     = () => {
            context.setDeletedRows(selectedRows);
            agApi.applyTransaction({remove: selectedRows});
        };
        const undoDel = () => {
            agApi.applyTransaction({add: context.deletedRows});
            context.setDeletedRows([]);
        };
        return [
            AgContext.Item("Add", add, faPlus),
            AgContext.Item(`Duplicate ${info}`, dup, faCopy, selectedRows.length === 0),
            AgContext.Item(`Delete ${info}`, del, faTrash, selectedRows.length === 0),
            AgContext.Item("Undo Delete", undoDel, faUndo, context.deletedRows.length === 0),
            AgContext.Separator,
            AgContext.Item("Sort", sor, faSortAmountUp),
            AgContext.Separator,
            AgContext.Item("Refresh", ref, faSync),
            AgContext.Separator,
            AgContext.Menu("Export",
                           AgContext.CsvFull(agApi, [{colId: key, sort: "asc"}]),
                           AgContext.Excel)
        ];
    }

    //endregion

    return (
        <>
            <Ag rowData={rows} isLoading={isLoading}
                rowGroupPanelShow="never" groupDefaultExpanded={0}
                editable undoRedoCellEditing enableCellChangeFlash
                enableRangeSelection enableFillHandle enableRangeHandle
                getRowClass={getRowClass} cellClassRules={cellClassRules}
                onRowDataUpdated={onRowDataUpdated} onCellValueChanged={onCellValueChanged}
                useSearch
                exportFileName={props.exportFileName} getContextMenuItems={getContextMenuItems}
                context={{deletedRows, setDeletedRows}}>
                {props.children}
            </Ag>

            <ModalConfirm ref={refModal} title="Refresh" onAction={refresh} warning="Your changes will be lost...">
                <p>Do you really want to refresh ?</p>
            </ModalConfirm>
        </>
    );
};
