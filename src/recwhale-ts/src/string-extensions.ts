/*eslint no-extend-native: ["error", { "exceptions": ["String"] }]*/
export {};

declare global {
    interface String {
        toStartCase(lowerCase?: boolean): string;
        toCamelCase(): string;

        toFieldText(): string;

        capitalized(): string;

        isEmpty(): boolean;
        empty(fallbackValue: string | undefined): string;
    }
}

String.prototype.toStartCase = function (this: string, lowerCase?: boolean): string {
    let result = this.replace(/[A-Z]/g, " $&");
    if(lowerCase !== false)
        result = result.toLowerCase();
    return result;
};

String.prototype.toCamelCase = function (this: string): string {
    let result = this.replace(/\s(.)/g, $ => $[1].toUpperCase());
    return result.charAt(0).toLowerCase() + result.slice(1);
};

String.prototype.toFieldText = function (this: string): string {
    return this.replace(".", " - ").toStartCase().capitalized();
};

String.prototype.capitalized = function (this: string): string {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.isEmpty = function (this: string): boolean {
    return !this;
};
String.prototype.empty = function (this: string, fallbackValue: string | undefined): string {
    return this.isEmpty() ? fallbackValue ?? "" : this;
};
