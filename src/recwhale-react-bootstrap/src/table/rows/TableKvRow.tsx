import {PropsWithChildren, ReactElement, ReactNode} from "react";
import {ITableKVProps}                from "../TableKV";
import {TableKVRowBase} from "./TableKVRowBase";
import {TableKVRowDate}               from "./TableKvRowDate";
/*import {TableKVRowJsx}    from "./TableKvRowJsx";
import {TableKVRowList}   from "./TableKvRowList";
import {TableKVRowMulti}  from "./TableKvRowMulti";*/
import {TableKVRowNumber}                           from "./TableKvRowNumber";
import {ReactHelper}                                from "recwhale-react-core";


export class TableKvRow {
    // static Text: typeof TableKVRowJsx       = TableKVRowJsx;
    static Date: typeof TableKVRowDate           = TableKVRowDate;
    static Number: typeof TableKVRowNumber           = TableKVRowNumber;
    /*static Jsx: typeof TableKVRowJsx     = TableKVRowJsx;
    static MultiLine: typeof TableKVRowMulti           = TableKVRowMulti;
    static List: typeof TableKVRowList           = TableKVRowList;*/

    static buildRows(props: PropsWithChildren<ITableKVProps>): [string, any][] {
        const rowsChildren = ReactHelper.getChildren(props);
        return rowsChildren.map(TableKvRow.toTableKVRow).flat();
    }

    static toTableKVRow(node: ReactNode): [string, any] | undefined {
        let element = node as ReactElement | undefined;
        if (!element)
            return undefined;
        const isCustom = Object.prototype.isPrototypeOf.call(TableKVRowBase, element.type);
        if (!isCustom)
            return undefined;
        //const isGroup = Object.prototype.isPrototypeOf.call(TableKVGroup, element.type);

        const customCol = ReactHelper.getComponent<TableKVRowBase<any>>(element);
        element         = customCol.render() as ReactElement;
        const key = customCol.getKey() as string;
        return [key, element];
        //const props          = element.props as PropsWithChildren<ColDef | ColGroupDef>;
        //const children       = ReactHelper.getChildren(element.props);
        //const childrenColDef = children.map((x: ReactNode) => TableKvRow.toTableKVRow(x)).flat();

        /*const isFragment = element.type === React.Fragment;
        if (isFragment)
            return childrenColDef;

        const colDef: ColDef | ColGroupDef = {};
        Object.assign(colDef, element.props);

        if (childrenColDef.length)
            (colDef as ColGroupDef).children = childrenColDef;

        return [colDef];*/
    }
}
