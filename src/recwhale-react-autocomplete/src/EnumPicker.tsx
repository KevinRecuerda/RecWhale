﻿import _                 from "lodash";
import React, {useState} from "react";
import {EnumHelper}      from "recwhale-ts";
import {Size}            from "../Size";
import type {Value}      from "./Autocomplete";
import {Autocomplete}    from "./Autocomplete";

export interface IEnumPickerProps<T extends string> {
    onChange: (item?: T) => void;
    optional?: boolean;
    useDefault?: boolean;
    defaultValue?: T;
    renderOption?: (item: T) => React.ReactNode;
    size?: Size;
}

interface IEnumPickerValueProps<T extends string> extends IEnumPickerProps<T> {
    type: Record<string, T>;
    name: string;
}

export function EnumPicker<T extends string>(props: IEnumPickerValueProps<T>): JSX.Element {

    const [items] = useState<T[]>(_.values(props.type));

    function initSelected(items: T[]): Value<T, false, undefined> | undefined {
        return props.defaultValue ?? (props.useDefault ? items[0] : undefined);
    }

    return (
        <Autocomplete
            options={items}
            initSelected={initSelected}
            label={props.name}
            size={props.size ?? "sm"}
            renderOption={(item: T) => <>{EnumHelper.format(item)}</>}
            urlLoader={{label: props.name, keySelector: (item: T) => item}}
            {...props}
        />
    );
}
