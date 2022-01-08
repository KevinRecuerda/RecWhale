import type {ValueFormatterParams} from "ag-grid-community/dist/lib/entities/colDef";
import type {ReactNode}            from "react";
import {Filter}                    from "../BuiltIn";
import {CellClass}                 from "../BuiltInExtended";
import {AgCol}                     from "./AgCol";
import {BaseAgCol}                 from "./BaseAgCol";
import type {IAgColNumberProps}    from "./AgColNumber";
import {FilterBuilder}             from "./FilterBuilder";

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
            if (params.colDef.field?.endsWith("weight"))
                return number.format("%", 4);
            return number.format(props.unit, props.fractionDigits ?? 2);
        }

        return params.value as string;
    }
}
