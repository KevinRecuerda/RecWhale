export function toArray<T>(value: T | T[] | null | undefined): T[] {
    if (!value)
        return [];

    if (Array.isArray(value))
        return value;

    return [value];
}
