import type {ICellRendererParams}                    from "ag-grid-community";
import type {AgGridColumnProps}                      from "ag-grid-react/lib/agGridColumn";
import type {ReactNode}                              from "react";
import React                                         from "react";
import {FaCheck, FaExclamation, FaQuestion, FaTimes} from "react-icons/fa";
import {Filter}                                      from "../built";
import {AgCol}                                       from "./AgCol";
import {BaseAgCol}                                   from "./BaseAgCol";
import {HtmlBuilder}                                 from "./HtmlBuilder";

interface IAgColOkProps extends AgGridColumnProps {
    errorLabel?: string;
    ignoreMissing?: (params: ICellRendererParams) => boolean;
}

export class AgColOk extends BaseAgCol<IAgColOkProps> {

    static map = new Map(
        [
            ["true", {text: "Ok", icon: FaCheck, class: "text-success"}],
            ["false", {text: "Error", icon: FaTimes, class: "text-danger"}],
            ["mixed", {text: "Mixed", icon: FaExclamation, class: "text-warning"}],
            ["missing", {text: "Missing", icon: FaQuestion, class: "text-danger"}],
            [undefined, {}]
        ]);

    render(): ReactNode {
        return <AgCol.Default width={50}
                              filter={Filter.Set}
                              filterParams={{cellRenderer: this.filterCellRenderer}}
                              cellRenderer={(params: ICellRendererParams) => this.cellRenderer(params, this.props.ignoreMissing)}
                              {...this.props}
        />;
    }

    cellRenderer(params: ICellRendererParams, ignoreMissing?: (params: ICellRendererParams) => boolean): HTMLElement | string {
        if (params.value == "missing" && !ignoreMissing?.(params))
            return "";

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        const item = AgColOk.map.get(params.value?.toString())!;
        if (!item.icon)
            return "";

        const icon = HtmlBuilder.icon(item.icon);
        return HtmlBuilder.span(icon, item.class);
    }

    filterCellRenderer(params: ICellRendererParams): string {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
        const value = params.value?.toString();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return AgColOk.map.get(value)?.text ?? value ?? "";
    }
}
