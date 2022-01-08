import type {Component, PropsWithChildren, ReactElement, ReactNode} from "react";
import React from "react";

export class ReactHelper {

    static getComponent<T extends Component>(element: ReactElement): T {
        const builder   = element.type as (new (props: any) => Component<any, any>);
        const component = new builder(element.props);
        return component as T;
    }

    static getChildren(props: PropsWithChildren<unknown>): ReactNode[] {
        const children: ReactNode[] = [];
        React.Children.map(props.children, child => children.push(child));
        return children;
    }

    static getAsset(path: string): string {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-var-requires
        return require("../assets/" + path).default as string;
    }
}
