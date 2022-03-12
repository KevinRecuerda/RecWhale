import moment, {Moment} from "moment";

export enum Type {
    Basic      = "basic",
    QuiteBasic = "quiteBasic"
}

export enum AnotherType {
    Basic        = "basic",
    AnotherBasic = "another basic"
}

export class Item {
    constructor(
        public id: string,
        public date: Moment,
        public number: number,
        public text: string,
        public type: Type
    ) {}
}

export const data: Item[] = [
    new Item("a", moment("2022-01-01"), 1.4, "example", Type.Basic),
    new Item("b", moment("2021-12-31"), 2, "text", Type.QuiteBasic),
    new Item("c", moment("2021-12-28"), 3.33333, "Item", Type.Basic),
    new Item("d", moment("2021-01-31"), 4.25, "Sample", Type.QuiteBasic)
];

export const dataMany: Item[] = Array.range(25)
                                     .flatMap(() => data);
