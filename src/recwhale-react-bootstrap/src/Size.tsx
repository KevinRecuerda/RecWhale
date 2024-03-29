﻿export type Size = "responsive" | "xs" | "sm" | "md" | "lg" | "xl";

export class SizeHelper {
    static map = new Map<Size, [number | string, number | string]>(
        [
            ["xs", [300, 300]],
            ["sm", [400, 400]],
            ["md", [600, 600]],
            ["lg", [800, 800]],
            ["xl", [1200, "100%"]],
            ["responsive", ["100%", "100%"]]
        ]);

    static width = (size?: Size): number | string => {
        return SizeHelper.map.get(size ?? "md")![0];
    };

    static height = (size?: Size): number | string => {
        return SizeHelper.map.get(size ?? "responsive")![1];
    };

    static fonts = new Map<Size, string>(
        [
            ["xs", "0.75em"],
            ["sm", "0.875em"],
            ["md", "1em"],
            ["lg", "1.25em"],
            ["xl", "1.5em"]
        ]
    );
}
