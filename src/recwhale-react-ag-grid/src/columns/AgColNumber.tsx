import type {ValueFormatterParams}                 from "ag-grid-community/dist/lib/entities/colDef";
import type {AgGridColumnProps}                    from "ag-grid-react/lib/agGridColumn";
import type {ReactNode}                            from "react";
import React                                       from "react";
import {Unit}                                      from "recwhale-ts";
import {CellClass, ExcelStyleType, FilterBuilder}  from "../built";
import {AgCol}                                     from "./AgCol";
import {BaseAgCol}                                 from "./BaseAgCol";

export interface IAgColNumberProps extends AgGridColumnProps {
    unit?: Unit;
    fractionDigits?: number;
    large?: boolean;
}

export class AgColNumber extends BaseAgCol<IAgColNumberProps> {

    static numberParserPct(value: number): number {
        return value ? value / 100 : value;
    }

    render(): ReactNode {
        return <AgCol.Default width={this.props.large ? 120 : 80}
                              cellClass={[CellClass.Right, this.buildCellClass()]}
                              {...FilterBuilder.number(this.props.unit)}
                              valueFormatter={(params: ValueFormatterParams) => this.valueFormatter(params, this.props)}
                              {...this.props}
        />;
    }

    valueFormatter(params: ValueFormatterParams, props: IAgColNumberProps): string {
        if (params.value == null)
            return "";

        const number = Number(params.value);
        return number.format(props.unit, props.fractionDigits);
    }
    
    buildCellClass(): string {
        const cellClassName: ExcelStyleType = (this.props.unit === "%" ? "percentType" : "numberType");
        
        if (this.props.fractionDigits)
            return `${cellClassName}${this.props.fractionDigits}`;
        return `${cellClassName}0`;
    }
  
}
