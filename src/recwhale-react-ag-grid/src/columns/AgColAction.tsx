import type {GridApi, ICellRendererParams, IFloatingFilterParams, RowNode} from "ag-grid-community";
import type {AgGridColumnProps}                                            from "ag-grid-react/lib/agGridColumn";
import type {ReactNode}                                                    from "react";
import React                                                               from "react";
import {IconType}                                                          from "react-icons";
import {CellClass}                                                         from "../BuiltInExtended";
import {AgCol}                                                             from "./AgCol";
import {BaseAgCol}                                                         from "./BaseAgCol";
import {FloatingFilterComp}                                                from "./FloatingFilterComp";
import {HtmlBuilder}                                                       from "./HtmlBuilder";

// TODO: make this extensible as autocomplete
export interface IAgColActionProps {
    text?: string;
    icon?: IconType;
    onClick: (node: RowNode, ag: GridApi) => void;
    onBulkClick?: (params: AgColActionParams) => void;
    enabled?: (node: RowNode) => boolean;
    showValue?: boolean;
}

export class AgColActionParams {
    constructor(
        public nodes: RowNode[],
        public ag: GridApi
    ) {}
}

// TODO: manage multiple actions: another component or same ?
export class AgColAction extends BaseAgCol<IAgColActionProps & AgGridColumnProps> {

    static buildButton(params: ICellRendererParams, props: Omit<IAgColActionProps, "onClick">, onClick: () => void): HTMLElement {
        const content = [
            props.showValue && params.value?.toString(), // eslint-disable-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            props.icon && HtmlBuilder.icon(props.icon),
            props.text
        ];
        return HtmlBuilder.button(content, onClick);
    }

    render(): ReactNode {
        return <AgCol.Default width={50}
                              suppressMenu
                              cellClass={CellClass.Centered}
                              cellRenderer={(params: ICellRendererParams) => this.renderCell(params, this.props)}
                              floatingFilterComponent={FloatingFilterComp.builderSafe(this.props.onBulkClick != null, (params: IFloatingFilterParams) => this.renderActionFilter(params, this.props))}
                              floatingFilterComponentParams={{suppressFilterButton: !(this.props.showValue ?? false)}}
                              {...this.props}
        />;
    }

    renderCell(params: ICellRendererParams, props: IAgColActionProps): HTMLElement | string {
        if (props.enabled && !props.enabled(params.node))
            return "";

        return AgColAction.buildButton(params, props, () => props.onClick(params.node, params.api));
    }

    renderActionFilter(params: IFloatingFilterParams, props: IAgColActionProps): HTMLElement {
        return AgColAction.buildButton({} as ICellRendererParams, props, () => props.onBulkClick!(new AgColActionParams(params.api.getSelectedNodes(), params.api)));
    }
}
