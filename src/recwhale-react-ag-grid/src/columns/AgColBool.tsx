import type {ICellRendererParams} from "ag-grid-community";
import type {AgGridColumnProps}   from "ag-grid-react/lib/agGridColumn";
import type {ReactNode}           from "react";
import React                      from "react";
import {Filter}                   from "../BuiltIn";
import {AgCol}                    from "./AgCol";
import {AgColBase}                from "./AgColBase";
import {HtmlHelper}               from "./HtmlHelper";

interface IAgColBoolProps extends AgGridColumnProps {
    hideFalse?: boolean;
    view?: "checkbox";
}

export class AgColBool extends AgColBase<IAgColBoolProps> {

    private static map = new Map(
        [
            [true, "yes"],
            [false, "no"],
            [undefined, ""]
        ]);

    render(): ReactNode {
        return <AgCol.Default width={50}
                              filter={Filter.Set}
                              filterParams={{cellRenderer: this.filterCellRenderer}}
                              cellRenderer={(params: any) => this.cellRenderer(params, this.props.hideFalse, this.props.view)}
                              editable={this.props.view !== "checkbox"}
                              {...this.props}
        />;
    }

    cellRenderer(params: ICellRendererParams, hideFalse?: boolean, view?: string): HTMLElement | string {
        if (!params.value && hideFalse)
            return "";

        if (view === "checkbox")
            return HtmlHelper.inputCheckbox(params);

        return AgColBool.map.get(params.value)!;
    }

    filterCellRenderer(params: ICellRendererParams): string {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        switch (params.value?.toString()) {
            case "true":
                return AgColBool.map.get(true)!;
            case "false":
                return AgColBool.map.get(false)!;
            case undefined:
                return AgColBool.map.get(undefined)!;
            default:
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return params.value ?? "";
        }
    }
}
