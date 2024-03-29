﻿import type {ExcelExportParams, GridApi}   from "ag-grid-community";
import type {ProcessHeaderForExportParams} from "ag-grid-community/dist/lib/interfaces/exportParams";
import _                                   from "lodash";
import {IconType}                          from "react-icons/lib";
import {HtmlBuilder}                       from "../columns";
import type {AgMenuItemDef}                from "./index";

export class AgContext implements AgMenuItemDef {

    static Separator = "separator";

    // https://www.ag-grid.com/javascript-grid-context-menu/#built-in-menu-items
    static Csv   = "csvExport";
    static Excel = "excelExport";

    constructor(public name: string,
                public action?: () => void,
                public icon?: HTMLElement | string,
                public disabled?: boolean,
                public tooltip?: string,
                public subMenu?: (AgMenuItemDef | string)[]) {
    }

    // Create a Menu
    static Menu(name: string, ...subMenu: (AgMenuItemDef | string)[]): AgMenuItemDef {
        return new AgContext(name, undefined, undefined, undefined, undefined, subMenu);
    }

    // Create an item
    static Item(name: string, action: () => void, icon?: IconType, disabled?: boolean, tooltip?: string): AgMenuItemDef {
        let html: HTMLElement | undefined = undefined;
        if (icon) {
            html = HtmlBuilder.icon(icon);
        }
        return new AgContext(name, action, html, disabled, tooltip);
    }

    static ExcelLite(agApi: GridApi, fileName: string): AgMenuItemDef {
        return AgContext.Item("Excel Export (lite)", () => {
            agApi.exportDataAsExcel(
                {
                    columnGroups: true,
                    allColumns:   false,
                    fileName:     fileName + "_lite"
                });
        });
    }

    static ExcelFull(agApi: GridApi, fileName: string): AgMenuItemDef {
        return AgContext.Item("Excel Export (full)", () => {
            agApi.exportDataAsExcel(
                {
                    columnGroups: true,
                    allColumns:   true,
                    fileName:     fileName + "full"
                });
        });
    }

    static ExcelCustom(agApi: GridApi, fileName: string, columns: string[], name?: string, params?: ExcelExportParams): AgMenuItemDef {
        return AgContext.Item(name ?? "Excel Export (Custom)", () => {
            agApi.exportDataAsExcel(
                {
                    columnGroups: true,
                    allColumns:   false,
                    columnKeys:   columns,
                    fileName:     fileName,
                    ... params
                });
        });
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static CsvFull(agApi: GridApi, sortModel: any): AgMenuItemDef {
        return AgContext.Item("CSV Export full", () => {
            const currentFilterModel = agApi.getFilterModel();
            const currentSortModel   = agApi.getSortModel();

            agApi.setFilterModel(null);
            agApi.setSortModel(sortModel);

            const config = {
                columnGroups:          false,
                processHeaderCallback: (x: ProcessHeaderForExportParams) => _.upperFirst(_.camelCase(x.column.getColId()))
            };
            agApi.exportDataAsCsv(config);

            agApi.setFilterModel(currentFilterModel);
            agApi.setSortModel(currentSortModel);
        });
    }
}
