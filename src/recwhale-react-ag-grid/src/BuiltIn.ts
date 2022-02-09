export const enum Filter {
    Set    = "agSetColumnFilter",
    Text   = "agTextColumnFilter",
    Number = "agNumberColumnFilter",
    Date   = "agDateColumnFilter",
    Multi  = "agMultiColumnFilter"
}

export const enum FloatingFilter {
    Set    = "agSetColumnFloatingFilter",
    Text   = "agTextColumnFloatingFilter",
    Number = "agNumberColumnFloatingFilter",
    Date   = "agDateColumnFloatingFilter"
}

export const enum CellEditor {
    Text        = "agTextCellEditor",
    TextLarge   = "agLargeTextCellEditor",
    Select      = "agSelectCellEditor",
    RichSelect  = "agRichSelectCellEditor",
    PopupText   = "agPopupTextCellEditor",
    PopupSelect = "agPopupSelectCellEditor"
}

export const enum CellRenderer {
    Group = "agGroupCellRenderer"
}

export const enum MasterDetail {
    CellRenderer = "agDetailCellRenderer"
}

export const enum ColGroupShow {
    Open   = "open",
    Closed = "closed"
}

export const enum AggFunc {
    Sum    = "sum",
    Single = "single"
}

export const enum StatusBarComp {
    Total            = "agTotalRowCountComponent",
    TotalAndFiltered = "agTotalAndFilteredRowCountComponent",
    Filtered         = "agFilteredRowCountComponent",
    Selected         = "agSelectedRowCountComponent",
    Aggregation      = "agAggregationComponent"
}
