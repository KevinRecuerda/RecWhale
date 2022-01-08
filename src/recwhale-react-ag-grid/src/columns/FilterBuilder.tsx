import {Unit}        from "recwhale-ts";
import {Filter}      from "../BuiltIn";
import {AgColNumber} from "./AgColNumber";

export class FilterBuilder {
    
    static multiple(...filters: (Filter | Record<string, unknown>)[]): Record<string, unknown> {
        return {
            filter:       Filter.Multi,
            filterParams: {
                filters: filters.map(f => {
                    return {filter: f};
                })
            }
        };
    }

    static number(unit?: Unit): Record<string, unknown> {
        return {
            filter:       Filter.Number,
            filterParams: {
                defaultOption: "greaterThanOrEqual",
                numberParser:  unit === "%" ? AgColNumber.numberParserPct : undefined
            }
        };
    }
}
