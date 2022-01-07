import type {ValueFormatterParams} from "ag-grid-community/dist/lib/entities/colDef";
import type {ReactNode}            from "react";
import React                       from "react";
import {Filter}                    from "../BuiltIn";
import {CellClass}                 from "../BuiltInExtended";
import {AgCol}                     from "./AgCol";
import {AgColBase}                 from "./AgColBase";
import type {IAgColNumberProps}    from "./AgColNumber";
import {FilterBuilder}             from "./FilterBuilder";

export class AgColSmart extends AgColBase<IAgColNumberProps> {

    static basicValues = [true, false, "true", "false"];

    render(): ReactNode {
        return <AgCol.Default
            width={150}
            cellClass={this.props.cellClass ?? CellClass.Right}
            {...FilterBuilder.Multiple(Filter.Text, Filter.Set, FilterBuilder.Number())}
            valueFormatter={(params: ValueFormatterParams) => this.valueFormatter(params, this.props)}
            {...this.props}
        />;
    }

    valueFormatter(params: ValueFormatterParams, props: IAgColNumberProps): string {
        // use '==' for null & undefined
        if (params.value == null)
            return "";

        if (AgColSmart.basicValues.includes(params.value))
            return params.value as string;

        const number = Number(params.value);
        if (!Number.isNaN(number)) {
            if (params.colDef.field?.endsWith("weight"))
                return number.format("%", 4);
            return number.format(props.unit, props.fractionDigits ?? 2);
        }

        return params.value as string;
    }
}
