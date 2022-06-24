import {Component, ReactNode} from "react";


export interface ITableKVRowBase<T> {
    //type: TableKVFormRowBase,
    name: string,
    onChange?: (value: T) => void,
    required?: boolean,
    readonly?: boolean,
    edit?: boolean,
    adaptValue?: (value: T) => T,
    value?: T,
}

export interface ITableKVGroup {
    groupName: string,
}

export abstract class TableKVRowBase<ITableKVRowBase> extends Component<ITableKVRowBase> {
    abstract render(): ReactNode;
    abstract getKey(): string;
}

export class TableKVGroup<ITableKVGroup> extends Component<ITableKVGroup> {}