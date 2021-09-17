/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/*eslint no-extend-native: ["error", { "exceptions": ["Moment"] }]*/
import type {Moment} from "moment";
import moment from "moment";

export {};

export type MomentView = "date" | "month" | "instant" | "time";
const map = new Map<MomentView, string>(
    [
        ["date", "YYYY-MM-DD"],
        ["month", "YYYY-MM"],
        ["instant", "YYYY-MM-DD HH:mm:ss"],
        ["time", "HH:mm"]
    ]);

// declare global
declare module "moment" {
    interface Moment {
        formatView(view: MomentView): string;

        formatInstant(): string;
        formatDate(): string;
        formatTime(): string;

        isEndOfMonth(): boolean;
    }
}

moment.fn.toJSON = function () { return this.toISOString(true); };

if (!moment.prototype.formatView) {
    (moment as any).prototype.formatView = function (this: Moment, view: MomentView): string {
        // TODO: remove this
        console.log("toto");
        return this.format(map.get(view));
    };
}

if (!moment.prototype.formatInstant) {
    (moment as any).prototype.formatInstant = function (this: Moment): string {
        return this.formatView("instant");
    };
}

if (!moment.prototype.formatDate) {
    (moment as any).prototype.formatDate = function (this: Moment): string {
        return this.formatView("date");
    };
}

if (!moment.prototype.formatTime) {
    (moment as any).prototype.formatTime = function (this: Moment): string {
        return this.formatView("time");
    };
}

if (!moment.prototype.isEndOfMonth) {
    (moment as any).prototype.isEndOfMonth = function (this: Moment): boolean {
        const lastDayOfMonth = this.clone().endOf("month");
        return this.isSame(lastDayOfMonth, "day");
    };
}
