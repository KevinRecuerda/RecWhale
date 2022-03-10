import * as _ from "lodash";

export interface AgExcelFormat {
    id: string;
    numberFormat: NumberFormat;
}

export interface NumberFormat {
    format: string;
}

export class AgClassFormat {
    public name: AgFormatClass;
    public format?: string;
    
    constructor(
        name: AgFormatClass,
        formatage?: string
    ) {
        this.name = name;
        this.format = formatage
    }
}

export type AgFormatClass = "numberType" | "percentType";

export class AgExportHelper {
    private static pattern: string = "{0}";
    
    static GetFormats = [ 
        new AgClassFormat("numberType"), 
        new AgClassFormat("percentType", `${AgExportHelper.pattern}%`)
    ];

    static Build(fractionDecimal: number): AgExcelFormat[] {
        return AgExportHelper.GetFormats.flatMap(
            (AGFormat) => AgExportHelper.BuildAgExcelFormat(fractionDecimal, AGFormat));
    }
    
    static BuildAgExcelFormat(fractionDecimal: number, columnFormat: AgClassFormat): AgExcelFormat[] {
        let agFormats: AgExcelFormat[] = [];
        
        for(let i = 0;i <= fractionDecimal; i++) {
            let decimal = AgExportHelper.BuildDecimal(i);
            let format = columnFormat.format ? _.replace(columnFormat.format, AgExportHelper.pattern, decimal) : decimal;
            let agFormat: AgExcelFormat = {
                id: `${columnFormat.name}${i}`,
                numberFormat: {
                    format: format,
                },
            }
            agFormats.push(agFormat);
        }
        return agFormats;
    }
    
    static BuildDecimal(decimal: number): string {
        let numberToDisplay = '0';
        
        for(let i = 0;i < decimal; i++) {
           if (i < 1)
               numberToDisplay += '.';
           numberToDisplay += '0';
        }
        return numberToDisplay;
    }
}
