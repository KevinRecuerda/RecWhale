export enum Filter {
    Set    = "agSetColumnFilter",
    Text   = "agTextColumnFilter",
    Number = "agNumberColumnFilter",
    Date   = "agDateColumnFilter",
    Multi  = "agMultiColumnFilter"
}

export enum FloatingFilter {
    Set    = "agSetColumnFloatingFilter",
    Text   = "agTextColumnFloatingFilter",
    Number = "agNumberColumnFloatingFilter",
    Date   = "agDateColumnFloatingFilter"
}

export enum CellEditor {
    Text        = "agTextCellEditor",
    TextLarge   = "agLargeTextCellEditor",
    Select      = "agSelectCellEditor",
    RichSelect  = "agRichSelectCellEditor",
    PopupText   = "agPopupTextCellEditor",
    PopupSelect = "agPopupSelectCellEditor"
}

export enum CellRenderer {
    Group = "agGroupCellRenderer"
}

export enum MasterDetail {
    CellRenderer = "agDetailCellRenderer"
}

export enum ColGroupShow {
    Open   = "open",
    Closed = "closed"
}

export enum AggFunc {
    Sum    = "sum",
    Single = "single"
}

export enum StatusBarComp {
    Total            = "agTotalRowCountComponent",
    TotalAndFiltered = "agTotalAndFilteredRowCountComponent",
    Filtered         = "agFilteredRowCountComponent",
    Selected         = "agSelectedRowCountComponent",
    Aggregation      = "agAggregationComponent"
}
