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
    useMissing?: (params: ICellRendererParams) => boolean;
}

export class AgColOk extends BaseAgCol<IAgColOkProps> {

    static map = new Map(
        [
            ["true", {text: "Ok", icon: FaCheck, class: "text-success"}],
            ["false", {text: "Error", icon: FaTimes, class: "text-danger"}],
            ["mixed", {text: "Mixed", icon: FaExclamation, class: "text-warning"}],
            ["optional", {text: "Optional", icon: FaQuestion, class: "text-success"}],
            [undefined, {text: "Missing", icon: FaQuestion, class: "text-secondary"}]
        ]);

    render(): ReactNode {
        return <AgCol.Default width={50}
                              filter={Filter.Set}
                              filterParams={{cellRenderer: this.filterCellRenderer}}
                              cellRenderer={(params: ICellRendererParams) => this.cellRenderer(params, this.props.useMissing)}
                              {...this.props}
        />;
    }

    cellRenderer(params: ICellRendererParams, useMissing?: (params: ICellRendererParams) => boolean): HTMLElement | string {
        if (params.value == null && !useMissing?.(params))
            return "";

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        const item = AgColOk.map.get(params.value?.toString())!;
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
