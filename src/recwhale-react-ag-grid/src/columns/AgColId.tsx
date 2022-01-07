import type {AgGridColumnProps} from "ag-grid-react/lib/agGridColumn";
import type {ReactNode}         from "react";
import React                    from "react";
import {Filter}                 from "../BuiltIn";
import {AgCol}                  from "./AgCol";
import {AgColBase}              from "./AgColBase";

type IdType = "isin" | "guid" | "reflex";

interface IAgColIdProps extends AgGridColumnProps {
    idType?: IdType;
}

export class AgColId extends AgColBase<IAgColIdProps> {
    static mapWidth(idType?: IdType): number {
        switch (idType) {
            case "guid":
                return 200;
            case "isin":
                return 150;
            case "reflex":
                return 80;
            default:
                return 100;
        }
    }

    render(): ReactNode {
        return <AgCol.Default width={AgColId.mapWidth(this.props.idType)}
                              filter={Filter.Text}
                              {...this.props}
        />;
    }
}
