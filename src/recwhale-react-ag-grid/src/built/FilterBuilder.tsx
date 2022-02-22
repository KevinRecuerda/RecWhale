import {Unit}   from "recwhale-ts";
import {Filter} from "./BuiltIn";

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
        const numberParserPct = (value: number): number => {
            return value ? value / 100 : value;
        };

        return {
            filter:       Filter.Number,
            filterParams: {
                defaultOption: "greaterThanOrEqual",
                numberParser:  unit === "%" ? numberParserPct : undefined
            }
        };
    }
}
