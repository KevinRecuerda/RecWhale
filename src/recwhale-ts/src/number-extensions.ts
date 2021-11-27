/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
export {};

export type Unit = "%" | "€" | "$" | string;

declare global {
    interface Number {
        adapt(unit?: Unit): number;

        format(unit?: Unit, fractionDigits?: number): string;
    }
}

Number.prototype.adapt = function (this: number, unit?: Unit): number {
    return unit === "%" ? this * 100 : this;
};

Number.prototype.format = function (this: number | undefined, unit?: Unit, fractionDigits?: number): string {
    if (this === undefined || isNaN(this))
        return "";

    const value = Number(this).adapt(unit);

    // use ES2020 to have more format options
    const formatter    = Intl.NumberFormat("fr", {maximumFractionDigits: fractionDigits ?? 0});
    let formattedValue = formatter.format(value);
    if (unit)
        formattedValue += ` ${unit}`;

    return formattedValue;
};
