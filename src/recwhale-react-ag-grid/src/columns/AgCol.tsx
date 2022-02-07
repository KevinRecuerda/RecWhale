import type {ColDef, ColGroupDef, ValueSetterParams}     from "ag-grid-community";
import {AgGridColumn}                                    from "ag-grid-react";
import type {AgGridReactProps}                           from "ag-grid-react/lib/agGridReact";
import type {PropsWithChildren, ReactElement, ReactNode} from "react";
import React                                             from "react";
import {ReactHelper}                                     from "recwhale-react-core";
import type {IAgGridReactSGProps}                        from "../Ag";
import {CellClass}                                       from "../BuiltInExtended";
import {AgColAction} from "./AgColAction";
import {BaseAgCol}   from "./BaseAgCol";
import {AgColBool}   from "./AgColBool";
import {AgColDate}                                       from "./AgColDate";
import {AgColDirection}                                  from "./AgColDirection";
import {AgColEnum}                                       from "./AgColEnum";
import {AgColId}                                         from "./AgColId";
import {AgColLink}                                       from "./AgColLink";
import {AgColNumber}                                     from "./AgColNumber";
import {AgColOk}                                         from "./AgColOk";
import {AgColSmart}                                      from "./AgColSmart";
import {AgColText}                                       from "./AgColText";

export class AgCol {
    static Action: typeof AgColAction       = AgColAction;
    static Bool: typeof AgColBool           = AgColBool;
    static Default: typeof AgGridColumn     = AgGridColumn;
    static Date: typeof AgColDate           = AgColDate;
    static Direction: typeof AgColDirection = AgColDirection;
    static Enum: typeof AgColEnum           = AgColEnum;
    static Id: typeof AgColId               = AgColId;
    static Link: typeof AgColLink           = AgColLink;
    static Ok: typeof AgColOk               = AgColOk;
    static Number: typeof AgColNumber       = AgColNumber;
    static Smart: typeof AgColSmart         = AgColSmart;
    static Text: typeof AgColText           = AgColText;

    static rowSelect = <AgCol.Default colId="_rowSelect" width={36} resizable={false} pinned cellClass={CellClass.Centered}
                                      checkboxSelection headerCheckboxSelection
                                      headerCheckboxSelectionFilteredOnly
                                      sortable={false} filter={false} suppressMenu/>;

    static buildProps = (props: IAgGridReactSGProps): AgGridReactProps => {
        return {
            columnDefs:         AgCol.buildColDefs(props),
            defaultColDef:      AgCol.defaultColDef(props),
            defaultColGroupDef: AgCol.defaultColGroupDef(),
            autoGroupColumnDef: AgCol.autoGroupColumnDef()
        };
    };

    static defaultColDef = (props: IAgGridReactSGProps): ColDef => {
        // noinspection HtmlUnknownAttribute
        return {
            editable:              props.editable,
            sortable:              true,
            filter:                true,
            floatingFilter:        true,
            resizable:             true,
            enableValue:           true,
            enableRowGroup:        true,
            enablePivot:           true,
            suppressSizeToFit:     true,
            flex:                  0,
            cellClassRules:        props.cellClassRules,
            // sort order at the end
            headerComponentParams: {
                template:
                    `<div class="ag-cell-label-container" role="presentation">
                        <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>
                        <div ref="eLabel" class="ag-header-cell-label" role="presentation">
                            <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>
                            <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>
                            <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>
                            <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>
                            <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>
                            <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>
                        </div>
                    </div>`
            }
        };
    };

    static defaultColGroupDef = (): ColGroupDef => ({
        marryChildren: false,
        children:      []
    });

    static autoGroupColumnDef = (): ColDef => ({
        flex: 1
        // filterValueGetter: (params: ValueGetterParams): string => params.api?.getValue(params.colDef.showRowGroup, params.node)
    });

    static buildColDefs(props: PropsWithChildren<IAgGridReactSGProps>): (ColDef | ColGroupDef)[] {

        const cols = ReactHelper.getChildren(props);
        if (props.onSelectedRows || props.isRowSelectable)
            cols.unshift(AgCol.rowSelect);

        return cols.map(AgCol.toColDef).flat();
    }

    static toColDef(node: ReactNode): (ColDef | ColGroupDef)[] {
        let element = node as ReactElement | undefined;
        if (!element)
            return [];

        const isCustom = Object.prototype.isPrototypeOf.call(BaseAgCol, element.type);
        if (isCustom) {
            const customCol = ReactHelper.getComponent<BaseAgCol<any>>(element);
            element         = customCol.render() as ReactElement;
        }

        const props          = element.props as PropsWithChildren<ColDef | ColGroupDef>;
        const children       = ReactHelper.getChildren(props);
        const childrenColDef = children.map((x: ReactNode) => AgCol.toColDef(x)).flat();

        const isFragment = element.type === React.Fragment;
        if (isFragment)
            return childrenColDef;

        const colDef: ColDef | ColGroupDef = {};
        Object.keys(element.props)
              // .filter(x => AgCol.colDefKeys.has(x))
              .forEach(x => (colDef as any)[x] = (props as any)[x]); // eslint-disable-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access

        if (childrenColDef.length)
            props.children = childrenColDef;

        return [props];
    }

    static safeSubValueSetter<T>(params: ValueSetterParams, safe: (data: T) => void): boolean {
        const field = params.colDef.field;
        if (!field)
            return false;

        const item = params.data as T;
        safe(item);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        let sub = params.data;

        const paths = field.split(".");
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
        paths.slice(0, paths.length - 1).forEach(p => sub = sub[p]);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
        sub[paths.last()] = params.newValue;
        return true;
    }
}
