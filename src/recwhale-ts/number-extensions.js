"use strict";
exports.__esModule = true;
Number.prototype.adapt = function (unit) {
    return unit === "%" ? this * 100 : this;
};
Number.prototype.format = function (unit, fractionDigits) {
    if (this === undefined || isNaN(this))
        return "";
    var value = Number(this).adapt(unit);
    // use ES2020 to have more format options
    var formatter = Intl.NumberFormat("fr", { maximumFractionDigits: fractionDigits !== null && fractionDigits !== void 0 ? fractionDigits : 0 });
    var formattedValue = formatter.format(value);
    if (unit)
        formattedValue += " " + unit;
    return formattedValue;
};
