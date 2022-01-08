import type {ValueFormatterParams} from "ag-grid-community";
import type {AgGridColumnProps}    from "ag-grid-react/lib/agGridColumn";
import moment, {Moment}            from "moment";
import type {ReactNode}            from "react";
import {MomentView}                from "recwhale-ts";
import {Filter}                    from "../BuiltIn";
import {AgCol}                     from "./AgCol";
import {BaseAgCol}                 from "./BaseAgCol";

interface IAgColDateProps extends AgGridColumnProps {
    view?: MomentView;
}

export class AgColDate extends BaseAgCol<IAgColDateProps> {

    static compare(filterValue: Moment, cellValue: Moment | string): number {
        const a = moment(filterValue).utc(true);
        const b = moment(cellValue).utc(true);
        return a.diff(b, 'ms');
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
