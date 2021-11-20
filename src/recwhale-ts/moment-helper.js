"use strict";
exports.__esModule = true;
exports.MomentHelper = void 0;
// import {isMoment}       from "moment";
// import type {DateRange} from "../../components/tech/datepicker";
var MomentHelper = /** @class */ (function () {
    function MomentHelper() {
    }
    MomentHelper.compare = function (dateA, dateB) {
        var a = dateA.utc(true);
        var b = dateB.utc(true);
        if (a.isAfter(b))
            return -1;
        if (a.isBefore(b))
            return 1;
        return 0;
    };
    MomentHelper.test = function () {
        return 1;
    };
    return MomentHelper;
}());
exports.MomentHelper = MomentHelper;
