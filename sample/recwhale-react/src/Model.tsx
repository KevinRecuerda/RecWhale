import {Moment} from "moment";

export enum Type {
    Basic      = "basic",
    QuiteBasic = "quiteBasic"
}

export class Item {
    constructor(
        public date: Moment,
        public number: number,
        public text: string,
        public type: Type
    ) {}
}
