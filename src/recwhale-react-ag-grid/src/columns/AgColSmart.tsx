import type {ValueFormatterParams}        from "ag-grid-community/dist/lib/entities/colDef";
import type {ReactNode}                   from "react";
import React                              from "react";
import {CellClass, Filter, FilterBuilder} from "../built";
import {AgCol}                            from "./AgCol";
import {BaseAgCol}                        from "./BaseAgCol";
import type {IAgColNumberProps}           from "./AgColNumber";

export class AgColSmart extends BaseAgCol<IAgColNumberProps> {

    static basicValues = [true, false, "true", "false"];

    render(): ReactNode {
        return <AgCol.Default
            width={150}
            cellClass={this.props.cellClass ?? CellClass.Right}
            {...FilterBuilder.multiple(Filter.Text, Filter.Set, FilterBuilder.number())}
            valueFormatter={(params: ValueFormatterParams) => this.valueFormatter(params, this.props)}
            {...this.props}
        />;
    }

    valueFormatter(params: ValueFormatterParams, props: IAgColNumberProps): string {
        if (params.value == null)
            return "";

        if (AgColSmart.basicValues.includes(params.value))
            return params.value as string;

        const number = Number(params.value);
        if (!Number.isNaN(number)) {
            let unit = props.unit;
            let fractionDigits = props.fractionDigits ?? 2;
            if (params.colDef.field?.endsWith("weight")){
                unit = "%";
                fractionDigits += 2;
            }
            return number.format(unit, fractionDigits);
        }

        return params.value as string;
    }
}
