export function nameof<T>(item: T, key: keyof T): string;
export function nameof<T>(key: keyof T): string;

export function nameof(key1: any, key2?: any): any {
    return key2 ?? key1;
}