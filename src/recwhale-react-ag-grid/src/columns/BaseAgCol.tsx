import type {ReactNode} from "react";
import {Component}      from "react";

export abstract class BaseAgCol<T> extends Component<T> {
    abstract render(): ReactNode;
}
