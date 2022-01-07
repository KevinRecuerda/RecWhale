import type {ValueFormatterParams} from "ag-grid-community";
import type {AgGridColumnProps}    from "ag-grid-react/lib/agGridColumn";
import moment                      from "moment";
import type {ReactNode}            from "react";
import React                       from "react";
import {MomentView}                from "recwhale-ts";
import {MomentHelper}              from "../../../../helpers/extensions/MomentHelper";
import {Filter}                    from "../BuiltIn";
import {AgCol}                     from "./AgCol";
import {AgColBase}                 from "./AgColBase";

interface IAgColDateProps extends AgGridColumnProps {
    view?: MomentView;
}

export class AgColDate extends AgColBase<IAgColDateProps> {

    static compare(filterValue: Date, cellValue: Date | string): number {
        return MomentHelper.compare(moment(filterValue), moment(cellValue));
    }

    render(): ReactNode {
        const view = this.props.view ?? "date";
        return <AgCol.Default width={view === "instant" ? 150 : 90}
                              valueFormatter={(params: ValueFormatterParams) => params.value ? moment(params.value).formatView(view) : ""}
                              filter={Filter.Date}
                              filterParams={{comparator: AgColDate.compare}}
                              {...this.props}
        />;
    }
}
