import {Moment} from "moment";

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
        public date: Moment,
        public number: number,
        public text: string,
        public type: Type
    ) {}
}
