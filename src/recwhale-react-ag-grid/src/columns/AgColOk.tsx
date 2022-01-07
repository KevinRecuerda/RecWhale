import {faCheck, faExclamation, faTimes} from "@fortawesome/free-solid-svg-icons";
import type {ICellRendererParams}        from "ag-grid-community";
import type {AgGridColumnProps}          from "ag-grid-react/lib/agGridColumn";
import type {ReactNode}                  from "react";
import React                             from "react";
import {Filter}                          from "../BuiltIn";
import {AgCol}                           from "./AgCol";
import {AgColBase}                       from "./AgColBase";
import {HtmlHelper}                      from "./HtmlHelper";

interface IAgColOkProps extends AgGridColumnProps {
    errorLabel?: string;
    useMissing?: (params: ICellRendererParams) => boolean;
}

export class AgColOk extends AgColBase<IAgColOkProps> {

    static map = new Map(
        [
            [true, {text: "Ok", icon: faCheck, class: "text-success"}],
            [false, {text: "Error", icon: faTimes, class: "text-danger"}],
            [undefined, {text: "Missing", icon: faExclamation, class: "text-warning"}]
        ]);

    render(): ReactNode {
        return <AgCol.Default width={50}
                              filter={Filter.Set}
                              filterParams={{cellRenderer: (params: ICellRendererParams) => this.filterCellRenderer(params, this.props.errorLabel)}}
                              cellRenderer={(params: ICellRendererParams) => this.cellRenderer(params, this.props.useMissing)}
                              {...this.props}
        />;
    }

    cellRenderer(params: ICellRendererParams, useMissing?: (params: ICellRendererParams) => boolean): HTMLElement | string {
        if (params.value == null && !useMissing?.(params))
            return "";

        const item = AgColOk.map.get(params.value)!;
        const icon = HtmlHelper.icon(item.icon);
        return HtmlHelper.span(icon, item.class);
    }

    filterCellRenderer(params: ICellRendererParams, errorLabel?: string): string {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        switch (params.value?.toString()) {
            case "true":
                return AgColOk.map.get(true)!.text;
            case "false":
                return errorLabel ?? AgColOk.map.get(false)!.text;
            case undefined:
                return AgColOk.map.get(undefined)!.text;
            default:
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return params.value ?? "";
        }
    }
}
