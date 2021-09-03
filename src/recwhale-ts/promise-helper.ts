export async function runParallel<T, TResult>(count: number, array: T[], action: (element: T) => Promise<TResult>): Promise<TResult[]> {
    const chunk   = array.chunk(count);
    const results: TResult[][] = [];
    for (const items of chunk) {
        const result = await Promise.all(items.map(action));
        results.push(result);
    }
    // CHECK: this work fine ?
    // const results = chunk.map(async items => await Promise.all(items.map(action)));
    return results.flat();
}
