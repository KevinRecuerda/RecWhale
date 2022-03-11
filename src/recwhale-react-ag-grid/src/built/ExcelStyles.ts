export class ExcelStyleGenerator {
    constructor(
        public name: ExcelStyleType,
        public formatter: (decimalPattern: string) => string
    ) {
    }

    run(fractionDecimal: number): ExcelStyle[] {
        let agFormats: ExcelStyle[] = [];
        let decimalPattern = "";

        for (let i = 0; i <= fractionDecimal; i++) {
            decimalPattern += "#";
            let format = this.formatter(decimalPattern);
            let agFormat: ExcelStyle = new ExcelStyle(`${this.name}${i}`, {format: format});

            agFormats.push(agFormat);

            if (i == 0)
                decimalPattern += ".";
        }
        return agFormats;
    }
}

export type ExcelStyleType = "numberType" | "percentType";

export class ExcelStyle {
    constructor(
        public id: string,
        public numberFormat: NumberFormat,
    ) {
    }
}

class NumberFormat {
    constructor(
        public format: string,
    ) {
    }
}