/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return */
import {faCheck}                                                                 from "@fortawesome/free-solid-svg-icons/faCheck";
import {faPlus}                                                                  from "@fortawesome/free-solid-svg-icons/faPlus";
import {FontAwesomeIcon}                                                         from "@fortawesome/react-fontawesome";
import {Chip, CircularProgress, TextField}                                       from "@material-ui/core";
import ListSubheader                                                             from "@material-ui/core/ListSubheader";
import type {AutocompleteGetTagProps, AutocompleteRenderGroupParams, Value as V} from "@material-ui/lab";
import {Autocomplete as AC}                                                      from "@material-ui/lab";
import {createFilterOptions}                                                     from "@material-ui/lab/Autocomplete";
import type {AutocompleteProps, AutocompleteRenderInputParams}                   from "@material-ui/lab/Autocomplete/Autocomplete";
import type {FilterOptionsState}                                                 from "@material-ui/lab/useAutocomplete/useAutocomplete";
import _                                                                         from "lodash";
import queryString                                                               from "query-string";
import React, {useState, useEffect}                                              from "react";
import {useLocation}                                                             from "react-router";
import type {Size}                                                               from "../Size";
import {SizeHelper}                                                              from "../Size";
import {virtualizationProps}                                                     from "./AutocompleteVirtualization";
import "./Autocomplete.scss";

// prefer default 'undefined' instead of 'null'
export type Value<T, Multiple, DisableClearable>
    = Multiple extends true ? T[]
    : DisableClearable extends true ? NonNullable<T>
        : T | undefined;

// multiple default props
export interface IAutocompleteWrapperProps<T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined = undefined,
    FreeSolo extends boolean | undefined = undefined> {
    multiple?: Multiple;
    disableClearable?: DisableClearable;
    freeSolo?: FreeSolo;
    freeSoloBuilder?: (input: string) => T;
    onChange: (value: Value<T, Multiple, DisableClearable>) => void;
    initSelected?: (items: T[]) => Value<T, Multiple, DisableClearable> | undefined;
    optional?: boolean;
    label?: string;
    size?: Size;
    isLoading?: boolean;
    onLoading?: (isLoading: boolean) => void;
    disabled?: boolean;
}

export function initMultipleItems<T, Multiple extends boolean | undefined = undefined>(items: T[], multiple?: Multiple): Value<T, Multiple, undefined> {
    const value = multiple ? items : items.firstOrDefault();
    return value as Value<T, Multiple, undefined>;
}

export interface IAutocompleteProps<T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined>
    extends Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, "value" | "defaultValue" | "onChange" | "renderInput" | "placeholder" | "size" | "onLoading" | "isLoading">,
        IAutocompleteWrapperProps<T, Multiple, DisableClearable, FreeSolo> {
    label: string;
    urlLoader?: { label: string; keySelector?: (item: T) => string };
}

export function Autocomplete<T,
    Multiple extends boolean | undefined = undefined,
    DisableClearable extends boolean | undefined = undefined,
    FreeSolo extends boolean | undefined = undefined>(props: IAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>): JSX.Element {

    const location = useLocation();

    //If use undefined => material-ui component is uncontrolled => selected property cannot be set
    const [selectedValue, setSelectedValue] = useState<Value<T, Multiple, DisableClearable>>((props.multiple ? [] : undefined) as Value<T, Multiple, DisableClearable>);

    const groupOnClickEnabled             = props.groupBy && props.multiple;
    const [optionsByKey, setOptionsByKey] = useState<Map<string, T[]>>(new Map());

    let {onChange, initSelected, label, optional, size, urlLoader, ...innerProps} = props;

    useEffect(() => props.onLoading?.(props.isLoading ?? false), [props.isLoading]);

    useEffect(() => onChange(selectedValue), [selectedValue]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        function init(): Value<T, Multiple, DisableClearable> | undefined {
            if (urlLoader) {
                const urlLabel = _.camelCase(urlLoader.label);
                const params   = queryString.parse(location.search, {arrayFormat: "comma"});
                const keys     = Array.build(params[urlLabel]).map(x => x.toLowerCase());

                if (keys.length) {
                    const initItems = props.options.filter(x => keys.includes((urlLoader?.keySelector?.(x) ?? x as any as string).toLowerCase()));
                    return initMultipleItems(initItems, props.multiple) as Value<T, Multiple, DisableClearable> | undefined;
                }
            }
            return initSelected?.(props.options);
        }

        const initValue = init();
        if (initValue)
            setSelectedValue(initValue);

        if (groupOnClickEnabled)
            setOptionsByKey(props.options.groupBy(props.groupBy!));
    }, [props.options]); // eslint-disable-line react-hooks/exhaustive-deps

    //region RENDER
    let placeholder = `select ${label}${props.multiple ? "(s)" : ""}`;
    if (optional)
        placeholder = `(optional) ${placeholder}`;

    const innerGetOptionLabel = innerProps.getOptionLabel;
    innerProps.getOptionLabel = (option: T) => {
        return innerGetOptionLabel?.(option)
            ?? ((option as any).toString && (option as any).toString() as string)
            ?? "";
    };

    const innerRenderOption   = innerProps.renderOption;
    innerProps.renderOption   = (option, state) => {
        const render = innerRenderOption?.(option, state)
            ?? innerProps.getOptionLabel?.(option)
            ?? option;

        const isNew = (option as any)._new === true;
        return <>
            <span className={`MuiAutocomplete-option-wrapper ${!innerProps.multiple ? "MuiAutocomplete-scroll" : ""}`}>
            {state.inputValue !== "__nocheck__" && <FontAwesomeIcon icon={isNew ? faPlus : faCheck} className="check" style={{visibility: state.selected || isNew ? "visible" : "hidden"}}/>}
                {render}
            </span>
        </>;
    };
    const renderOptionNoCheck = (option: T) => innerProps.renderOption!(option, {inputValue: "__nocheck__", selected: false});

    const renderInput = (params: AutocompleteRenderInputParams): React.ReactNode => {
        const {disabled, InputLabelProps, InputProps, inputProps, ...innerParams} = params;

        const showSingleCustomRender = !props.multiple && innerRenderOption && selectedValue;
        if (showSingleCustomRender) {
            const selected = innerProps.getOptionLabel!(selectedValue as T);
            if ((inputProps as any).value === selected)
                (inputProps as any).value = "";
        }

        return <TextField {...innerParams}
                          disabled={disabled || props.loading}
                          label={label}
                          placeholder={showSingleCustomRender ? "" : placeholder}
                          variant="outlined"
                          InputLabelProps={{shrink: true, ...InputLabelProps}}
                          InputProps={{
                              ...InputProps,
                              startAdornment: <>
                                                  {InputProps.startAdornment}
                                                  {showSingleCustomRender && renderOptionNoCheck(selectedValue as T)}
                                              </>, /* eslint-disable-line indent */
                              endAdornment:   <>
                                                  {props.loading && <CircularProgress color="inherit" size={20}/>}
                                                  {InputProps.endAdornment}
                                              </> /* eslint-disable-line indent */
                          }}
                          inputProps={inputProps}
        />;
    };
    //endregion

    //region MULTIPLE
    if (innerProps.multiple) {
        innerProps.disableCloseOnSelect = true;

        if (!innerProps.limitTags)
            innerProps.limitTags = 2;

        // override edit render (which display all selected items)
        if (!innerProps.renderTags)
            innerProps.renderTags = (tags: any[], getTagProps: AutocompleteGetTagProps) => {
                const tagsToRender   = tags.slice(0, innerProps.limitTags)
                    .map((option, index) => <Chip key={index} label={renderOptionNoCheck(option)} size="small" {...getTagProps({index})} />);
                const additionalTags = tags.length - innerProps.limitTags!;
                return <div className="MuiAutocomplete-tags mr-2 MuiAutocomplete-scroll">
                    {tagsToRender}
                    {additionalTags > 0 && <small>{additionalTags} more...</small>}
                </div>;
            };
    }
    //endregion

    //region GROUP
    const groupOnClick = (key: string) => {
        const options  = optionsByKey.get(key) ?? [];
        const selected = selectedValue as T[];

        const missingSelected = options.filter(x => !selected.includes(x)).length > 0;
        const selector        = missingSelected ? _.union : _.difference;

        const value = selector(selected, options);
        setSelectedValue(value as Value<T, Multiple, DisableClearable>);
    };

    const groupProps = (key: string) => groupOnClickEnabled ? {onClick: () => groupOnClick(key), className: "MuiAutocomplete-option"} : {};

    const innerRenderGroup = innerProps.renderGroup;
    innerProps.renderGroup = (params: AutocompleteRenderGroupParams) => [
        <ListSubheader key={params.key} {...groupProps(params.group)}>{innerRenderGroup?.(params) ?? params.group}</ListSubheader>,
        params.children,
        <hr key={`${params.key}-hr`} className="border-0"/>,
        <hr key={`${params.key}-hr2`}/>
    ];
    //endregion

    //region FREESOLO
    if (innerProps.freeSolo) {
        const innerFilterOptions = props.filterOptions ?? createFilterOptions<T>();
        innerProps.filterOptions = (options: T[], state: FilterOptionsState<T>) => {
            const filtered = innerFilterOptions(options, state);
            if (state.inputValue !== "" && props.freeSoloBuilder) {
                const item         = props.freeSoloBuilder(state.inputValue);
                (item as any)._new = true;
                filtered.unshift(item);
            }

            return filtered;
        };

        innerProps.selectOnFocus = true;
        innerProps.clearOnBlur   = true;
    }
    //endregion

    const adapt = (value: Value<T, Multiple, DisableClearable>): V<T, Multiple, DisableClearable, FreeSolo> => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        return (value !== undefined ? value : null) as any as V<T, Multiple, DisableClearable, FreeSolo>;
    };

    const adaptBack = (value: V<T, Multiple, DisableClearable, FreeSolo>): Value<T, Multiple, DisableClearable> => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        return (value !== null ? value : undefined) as any as Value<T, Multiple, DisableClearable>;
    };

    size ??= "md";

    return (
        <AC
            value={adapt(selectedValue)}
            onChange={(_event: React.ChangeEvent<any>, value: V<T, Multiple, DisableClearable, FreeSolo>) => setSelectedValue(adaptBack(value))}
            loading={props.isLoading}
            renderInput={renderInput}
            placeholder={placeholder}
            size="small"
            style={{width: SizeHelper.width(size)}}
            {...virtualizationProps()}
            {...innerProps}
        />
    );
}
