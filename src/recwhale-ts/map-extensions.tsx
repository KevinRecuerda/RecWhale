﻿/*eslint no-extend-native: ["error", { "exceptions": ["Map"] }]*/
export {};

declare global {
    interface Map<K, V> {
        isEmpty(): boolean;

        filter(predicate: (k: K, v: V) => boolean): Map<K, V>;

        map<T>(selector: (k: K, v: V) => T): T[];

        mapStrict<T>(keySelector: (k: K, v: V) => T): Map<T, V>;

        mapKey<T>(selector: (k: K, v: V) => T): Map<T, V>;

        mapValue<T>(selector: (k: K, v: V) => T): Map<K, T>;
    }
}

Map.prototype.isEmpty = function <K, V>(this: Map<K, V>): boolean {
    return this.size === 0;
};

Map.prototype.filter = function <K, V>(this: Map<K, V>, predicate: (k: K, v: V) => boolean): Map<K, V> {
    const items = [...this.entries()].filter(([k, v]) => predicate(k, v));
    return new Map(items);
};

Map.prototype.map = function <K, V, T>(this: Map<K, V>, selector: (k: K, v: V) => T): T[] {
    return [...this.entries()].map(([k, v]) => selector(k, v));
};

Map.prototype.mapStrict = function <K, V, T>(this: Map<K, V>, keySelector: (k: K, v: V) => T): Map<T, V> {
    const entries = [...this.entries()].reduce((all, [k, v]) => {
        const key = keySelector(k, v);
        if (key != null)
            all.push([key, v]);
        return all;
    }, [] as [T, V][]);
    return new Map<T, V>(entries);
};

Map.prototype.mapKey = function <K, V, T>(this: Map<K, V>, selector: (k: K, v: V) => T): Map<T, V> {
    const entries = [...this.entries()].map(([k, v]) => [selector(k, v), v] as [T, V]);
    return new Map<T, V>(entries);
};

Map.prototype.mapValue = function <K, V, T>(this: Map<K, V>, selector: (k: K, v: V) => T): Map<K, T> {
    const entries = [...this.entries()].map(([k, v]) => [k, selector(k, v)] as [K, T]);
    return new Map<K, T>(entries);
};
