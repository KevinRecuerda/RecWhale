function nameof2<T>(selector: (item: T) => any, skipPath?: number): string {
  skipPath ??= 0;
  const paths = selector.toString().split(".").slice(1 + skipPath);
  const name = paths.join(".");
  return name;
}
