import React, {useState}                         from "react";
import {EnumHelper}                              from "recwhale-ts";
import type {Value}                              from "./Autocomplete";
import {Autocomplete, IAutocompleteWrapperProps} from "./Autocomplete";

export interface IEnumPickerProps<T extends string, Multiple extends boolean | undefined = undefined> extends IAutocompleteWrapperProps<T, Multiple> {
    useDefault?: boolean;
    defaultValue?: T;
    strictRender?: boolean;
}

interface IEnumPickerValueProps<T extends string, Multiple extends boolean | undefined = undefined> extends IEnumPickerProps<T, Multiple> {
    type: Record<string, T>;
    name: string;
}

export function EnumPicker<T extends string, Multiple extends boolean | undefined = undefined>(props: IEnumPickerValueProps<T, Multiple>): JSX.Element {

    const [items] = useState<T[]>(Object.values(props.type));

    function initSelected(items: T[]): Value<T, Multiple, undefined> | undefined {
        const defaultValue = props.defaultValue ?? (props.useDefault ? items[0] : undefined);
        const selected     = props.multiple ? Array.build(defaultValue) : defaultValue;
        return selected as Value<T, Multiple, undefined> | undefined;
    }

    const renderOption = props.strictRender
        ? undefined
        : (item: T) => <>{EnumHelper.format(item)}</>;

    return (
        <Autocomplete
            options={items}
            initSelected={initSelected}
            label={props.name}
            size={props.size ?? "sm"}
            renderOption={renderOption}
            urlLoader={{label: props.name, keySelector: (item: T) => item}}
            {...props}
        />
    );
}
