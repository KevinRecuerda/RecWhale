import type {RowNode, ICellRendererParams} from "ag-grid-community";
import type {AgGridColumnProps}            from "ag-grid-react/lib/agGridColumn";
import type {ReactNode}                    from "react";
import React                               from "react";
import {FaExternalLinkAlt}                 from "react-icons/fa";
import {CellClass}                         from "../built";
import {AgCol}                             from "./AgCol";
import {BaseAgCol}                         from "./BaseAgCol";
import {HtmlBuilder}                       from "./HtmlBuilder";

export interface IAgColLinkProps {
    enabled?: (node: RowNode) => boolean;
}

export class AgColLink extends BaseAgCol<IAgColLinkProps & AgGridColumnProps> {

    render(): ReactNode {
        return <AgCol.Default width={50}
                              suppressMenu
                              cellClass={CellClass.Centered}
                              cellRenderer={(params: any) => this.renderCell(params)}
                              {...this.props}
        />;
    }

    renderCell(params: ICellRendererParams): HTMLElement | string {
        return this.props.enabled?.(params.node) === false
               ? ""
               : HtmlBuilder.link(params.value, HtmlBuilder.icon(FaExternalLinkAlt), true);
    }
}
