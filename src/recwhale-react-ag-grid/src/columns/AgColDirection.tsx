import type {ICellRendererParams} from "ag-grid-community";
import type {AgGridColumnProps}   from "ag-grid-react/lib/agGridColumn";
import type {ReactNode}           from "react";
import React                      from "react";
import {Filter}                   from "../BuiltIn";
import {AgCol}                    from "./AgCol";
import {BaseAgCol}                from "./BaseAgCol";

export class AgColDirection extends BaseAgCol<AgGridColumnProps> {

    static mappings = new Map(
        [
            ["up", "↗"],
            ["down", "↘"]
        ]
    );

    static renderCell(params: ICellRendererParams): string {
        const mapping = AgColDirection.mappings.get(params.value);
        return mapping ?? params.value as string;
    }

    render(): ReactNode {
        return <AgCol.Default width={70}
                              filter={Filter.Set}
                              filterParams={{
                                  cellRenderer:  AgColDirection.renderCell,
                                  cellHeight:    20,
                                  values:        ["up", "down"],
                                  newRowsAction: "keep"
                              }}
                              cellRenderer={AgColDirection.renderCell}
                              {...this.props}
        />;
    }
}
