import type {AgGridColumnProps}   from "ag-grid-react/lib/agGridColumn";
import type {ReactNode}           from "react";
import React                      from "react";
import {AgCol}                    from "./AgCol";
import {BaseAgCol}                from "./BaseAgCol";

export class AgColSep extends BaseAgCol<AgGridColumnProps> {

    render(): ReactNode {
        return <AgCol.Default width={20} filter={false} cellClass="info muted" {...this.props}/>
    }
}
