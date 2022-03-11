import {ExcelStyle, ExcelStyleGenerator} from "./ExcelStyles";

export class ExportHelper {

    static formats = [
        new ExcelStyleGenerator("numberType", (decimalPattern) => decimalPattern),
        new ExcelStyleGenerator("percentType", (decimalPattern: string) => `${decimalPattern}%`)
    ];

    static buildExcelStyles(fractionDecimal: number = 10): ExcelStyle[] {
        return ExportHelper.formats.flatMap((generator) => generator.run(fractionDecimal));
    }
}



