import type {ICellRendererParams} from "ag-grid-community";
import type {AgGridColumnProps}   from "ag-grid-react/lib/agGridColumn";
import type {ReactNode}           from "react";
import React                      from "react";
import {Filter}                   from "../BuiltIn";
import {AgCol}                    from "./AgCol";
import {AgColBase}                from "./AgColBase";
import {FilterBuilder}            from "./FilterBuilder";

interface IAgColTextProps extends AgGridColumnProps {
    multiline?: boolean;
    useSetFilter?: boolean;
}

export class AgColText extends AgColBase<IAgColTextProps> {

    render(): ReactNode {
        const multilineProps = {
            autoHeight:   true,
            wrapText:     true,
            cellRenderer: this.multilineRenderer
        };
        
        return <AgCol.Default suppressSizeToFit={false}
                              {...FilterBuilder.Multiple(Filter.Text, ...(this.props.useSetFilter ? [Filter.Set] : []))}
                              {...(this.props.multiline ? multilineProps : {})}
                              {...this.props}
        />;
    }

    multilineRenderer(params: ICellRendererParams): HTMLElement | string {
        return (params.value as string | undefined)?.replace(/\n/g, "<br/>") ?? "";
    }
}
