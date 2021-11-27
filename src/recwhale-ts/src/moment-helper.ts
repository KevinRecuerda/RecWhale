import type {Moment}    from "moment";
// import {isMoment}       from "moment";
// import type {DateRange} from "../../components/tech/datepicker";

export class MomentHelper {

    static compare(dateA: Moment, dateB: Moment): number {
        const a = dateA.utc(true);
        const b = dateB.utc(true);
        if (a.isAfter(b))
            return -1;
        if (a.isBefore(b))
            return 1;
        return 0;
    }
    
    static test():number {
        return 1;
    }

    // static toDateRange(value: Moment | DateRange): DateRange {
    //     return isMoment(value)
    //         ? {from: value, to: value}
    //         : value;
    // }
}
