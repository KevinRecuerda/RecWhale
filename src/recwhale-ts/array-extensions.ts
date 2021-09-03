/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/
import {runParallel} from "./PromiseHelper";

export {};

declare global {
    interface Array<T> {
        // manipulation
        firstOrDefault(): T | undefined;

        last(): T;

        distinct(): T[];

        empty(fallbackItems: T[]): T[];

        sortBy<TKey>(keySelector: (element: T) => TKey, desc?: boolean): T[];

        sortByEnumOrder<TKey>(type: any, keySelector: (element: T) => TKey, desc?: boolean): T[];

        chunk(count: number): T[][];

        delete<TKey>(keySelector: (element: T) => TKey): T[];

        sum(keySelector?: (element: T) => number): number;

        max<TKey>(keySelector: (element: T) => TKey, defaultValue: TKey): TKey;

        // transformation
        mapStrict<TResult>(selector: (element: T) => TResult): TResult[];

        cast<TResult>(): TResult[];

        ofType<TResult extends T>(type: { new(): T }): TResult[];

        groupBy<TKey>(keySelector: (element: T) => TKey, deepCompare?: boolean): Map<TKey, T[]>;

        toMap<TKey>(keySelector: (element: T) => TKey): Map<TKey, T>;

        toFlatSet<TKey>(keysSelector: (element: T) => TKey[]): Set<TKey>;

        // parallel
        mapParallel<TResult>(count: number, action: (element: T) => Promise<TResult>): Promise<TResult[]>;
    }
}

//region manipulation
Array.prototype.firstOrDefault = function <T>(this: T[]): T | undefined {
    return this.length ? this[0] : undefined;
};
Array.prototype.last           = function <T>(this: T[]): T {
    return this[this.length - 1];
};

Array.prototype.distinct        = function <T>(this: T[]): T[] {
    return [...new Set(this)];
};
Array.prototype.empty           = function <T>(this: T[], fallbackItems: T[]): T[] {
    return this.length ? this : fallbackItems;
};
Array.prototype.sortBy          = function <T, TKey>(this: T[], keySelector: (element: T) => TKey, desc?: boolean): T[] {
    return this.sort((a, b) => {
        const keyA = keySelector(a);
        const keyB = keySelector(b);

        const comparison = keyA < keyB ? -1
                                       : keyA > keyB ? 1
                                                     : 0;
        return desc ? -comparison : comparison;
    });
};
Array.prototype.sortByEnumOrder = function <T, TKey>(this: T[], type: TKey, keySelector: (element: T) => TKey, desc?: boolean): T[] {
    const order = Object.values(type);
    return this.sortBy(x => order.indexOf(keySelector(x)), desc);
};

Array.prototype.chunk  = function <T>(this: T[], count: number): T[][] {
    const chunk: T[][] = [];
    for (let i = 0; i < this.length; i += count)
        chunk.push(this.slice(i, i + count));
    return chunk;
};
Array.prototype.delete = function <T, TKey>(this: T[], keySelector: (element: T) => TKey): T[] {
    const index = this.findIndex(keySelector);
    if (index >= 0)
        this.splice(index, 1);
    return this;
};

Array.prototype.sum = function <T>(this: T[], keySelector?: (element: T) => number): number {
    return this.reduce((sum, x) => {
        const n = keySelector?.(x) ?? x as any as number;
        return sum + n;
    }, 0);
};
Array.prototype.max = function <T, TKey>(this: T[], keySelector: (element: T) => TKey, defaultValue: TKey): TKey {
    return this.reduce((all, x) => {
        const key = keySelector(x);
        return !all || all < key ? key : all;
    }, undefined as (TKey | undefined)) ?? defaultValue;
};
//end region

//region transformation
Array.prototype.mapStrict = function <T, TResult>(this: T[], selector: (element: T) => TResult): TResult[] {
    return this.reduce((all, x) => {
        const item = selector(x);
        if (item != null)
            all.push(item);
        return all;
    }, [] as TResult[]);
};

Array.prototype.cast = function <T, TResult>(this: T[]): TResult[] {
    return this.map(x => x as unknown as TResult);
};

Array.prototype.ofType = function <T, TResult extends T>(this: T[], type: { new(): T }): TResult[] {
    return this.filter(x => x instanceof type).cast<TResult>();
};

Array.prototype.groupBy = function <T, TKey>(this: T[], keySelector: (element: T) => TKey, deepCompare?: boolean): Map<TKey, T[]> {
    if (deepCompare) {
        const map = this.groupBy(x => JSON.stringify(keySelector(x)));
        return map.mapKey((k) => JSON.parse(k) as TKey);
    }
    return this.reduce((all, x) => {
        const key  = keySelector(x);
        const item = all.get(key);
        item ? item.push(x)
             : all.set(key, [x]);
        return all;
    }, new Map<TKey, T[]>());
};

Array.prototype.toMap = function <T, TKey>(this: T[], keySelector: (element: T) => TKey): Map<TKey, T> {
    return new Map(this.map(x => [keySelector(x), x]));
};

Array.prototype.toFlatSet = function <T, TKey>(this: T[], keysSelector: (element: T) => TKey[]): Set<TKey> {
    const keys = new Set<TKey>();
    this.forEach(x => {
        const itemKeys = keysSelector(x);
        itemKeys.forEach(k => keys.add(k));
    });
    return keys;
};
//end region

//region parallel
Array.prototype.mapParallel = async function <T, TResult>(this: T[], count: number, action: (element: T) => Promise<TResult>): Promise<TResult[]> {
    return runParallel(count, this, action);
};
//end region

