import type {ValueFormatterParams} from "ag-grid-community/dist/lib/entities/colDef";
import type {AgGridColumnProps}    from "ag-grid-react/lib/agGridColumn";
import type {ReactNode}            from "react";
import React                       from "react";
import {Unit}                      from "recwhale-ts";
import {CellClass}                 from "../BuiltInExtended";
import {AgCol}                     from "./AgCol";
import {AgColBase}                 from "./AgColBase";
import {FilterBuilder}             from "./FilterBuilder";

export interface IAgColNumberProps extends AgGridColumnProps {
    unit?: Unit;
    fractionDigits?: number;
    large?: boolean;
}

export class AgColNumber extends AgColBase<IAgColNumberProps> {

    static numberParserPct(value: number): number {
        return value ? value / 100 : value;
    }

    render(): ReactNode {
        return <AgCol.Default width={this.props.large ? 120 : 80}
                              cellClass={CellClass.Right}
                              {...FilterBuilder.Number(this.props.unit)}
                              valueFormatter={(params: ValueFormatterParams) => this.valueFormatter(params, this.props)}
                              {...this.props}
        />;
    }

    valueFormatter(params: ValueFormatterParams, props: IAgColNumberProps): string {
        // use '==' for null & undefined
        if (params.value == null)
            return "";

        const number = Number(params.value);
        return number.format(props.unit, props.fractionDigits);
    }
}
