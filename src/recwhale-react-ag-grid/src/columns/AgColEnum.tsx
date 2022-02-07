import {ValueFormatterParams}   from "ag-grid-community";
import type {RowNode}           from "ag-grid-community";
import type {AgGridColumnProps} from "ag-grid-react/lib/agGridColumn";
import type {ReactNode}         from "react";
import React                    from "react";
import {EnumHelper}             from "recwhale-ts";
import {CellEditor, Filter}     from "../BuiltIn";
import {AgCol}                  from "./AgCol";
import {BaseAgCol}              from "./BaseAgCol";

interface IAgColEnumProps extends AgGridColumnProps {
    type: any;
    allowEmpty?: boolean;
    useOrdinalSort?: boolean;
}

export class AgColEnum extends BaseAgCol<IAgColEnumProps> {

    static formatValue(params: ValueFormatterParams): string {
        return EnumHelper.format(params.value);
    }

    render(): ReactNode {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const {type, ...innerProps} = this.props;

        const keys: any[] = Object.keys(this.props.type);
        if (this.props.allowEmpty)
            keys.unshift(null);

        const values            = Object.values(this.props.type);
        const ordinalComparator = (valueA: any, valueB: any, _nodeA: RowNode, _nodeB: RowNode, _isInverted: boolean): number => values.indexOf(valueA) - values.indexOf(valueB);

        return <AgCol.Default cellEditor={CellEditor.Select}
                              cellEditorParams={{values: keys}}
                              filter={Filter.Set}
                              filterParams={{valueFormatter: AgColEnum.formatValue}}
                              comparator={this.props.useOrdinalSort ? ordinalComparator : undefined}
                              valueFormatter={AgColEnum.formatValue}
                              {...innerProps}
        />;
    }
}
