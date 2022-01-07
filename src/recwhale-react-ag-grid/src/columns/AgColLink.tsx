import {faExternalLinkAlt}                 from "@fortawesome/free-solid-svg-icons";
import type {RowNode, ICellRendererParams} from "ag-grid-community";
import type {AgGridColumnProps}            from "ag-grid-react/lib/agGridColumn";
import type {ReactNode}                    from "react";
import React                               from "react";
import {CellClass}                         from "../BuiltInExtended";
import {AgCol}                             from "./AgCol";
import {AgColBase}                         from "./AgColBase";
import {HtmlHelper}                        from "./HtmlHelper";

export interface IAgColLinkProps {
    enabled?: (node: RowNode) => boolean;
}

export class AgColLink extends AgColBase<IAgColLinkProps & AgGridColumnProps> {

    render(): ReactNode {
        return <AgCol.Default width={50}
                              suppressMenu
                              cellClass={CellClass.Centered}
                              cellRenderer={(params: any) => this.renderCell(params)}
                              {...this.props}
        />;
    }

    renderCell(params: ICellRendererParams): HTMLElement | string {
        return this.props.enabled && !this.props.enabled(params.node) ? "": HtmlHelper.link(params.value, HtmlHelper.icon(faExternalLinkAlt), true);
    }
}
