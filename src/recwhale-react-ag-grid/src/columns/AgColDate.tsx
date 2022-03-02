import type {ValueFormatterParams} from "ag-grid-community";
import type {AgGridColumnProps}    from "ag-grid-react/lib/agGridColumn";
import moment                      from "moment";
import type {ReactNode}            from "react";
import React                       from "react";
import {MomentView}                from "recwhale-ts";
import {Filter}                    from "../built";
import {AgCol}                     from "./AgCol";
import {BaseAgCol}                 from "./BaseAgCol";

interface IAgColDateProps extends AgGridColumnProps {
    view?: MomentView;
}

export class AgColDate extends BaseAgCol<IAgColDateProps> {

    render(): ReactNode {
        const view = this.props.view ?? "date";
        return <AgCol.Default width={view === "instant" ? 150 : 90}
                              type="date"
                              valueFormatter={(params: ValueFormatterParams) => params.value ? moment(params.value).formatView(view) : ""}
                              filter={Filter.Date}
                              {...this.props}
        />;
    }
}
