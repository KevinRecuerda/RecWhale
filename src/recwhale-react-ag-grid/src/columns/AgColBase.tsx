import type {ReactNode} from "react";
import {Component}      from "react";

export abstract class AgColBase<T> extends Component<T> {
    abstract render(): ReactNode;
}
