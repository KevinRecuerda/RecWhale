import type {AgGridColumnProps} from "ag-grid-react/lib/agGridColumn";
import type {ReactNode}         from "react";
import {Filter}                 from "../BuiltIn";
import {AgCol}                  from "./AgCol";
import {BaseAgCol}              from "./BaseAgCol";
import "recwhale-ts";

type IdType = "guid" | "number" | string;

interface IAgColIdProps extends AgGridColumnProps {
    idType?: IdType;
}

export class AgColId extends BaseAgCol<IAgColIdProps> {

    static widthMappings = new Map<IdType, number>(
        [
            ["guid", 200],
            ["number", 150],
            ["*", 100]
        ]);

    static getWidth(idType?: IdType): number {
        const defaultValue = AgColId.widthMappings.get("*");
        return AgColId.widthMappings.getSafely(idType, defaultValue)!;
    }

    render(): ReactNode {
        return <AgCol.Default width={AgColId.getWidth(this.props.idType)}
                              filter={Filter.Text}
                              {...this.props}
        />;
    }
}
