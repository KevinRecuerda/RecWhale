import moment from "moment";
import React              from "react";
import { EnumPicker, Autocomplete}        from "recwhale-react-autocomplete";
import {Item, Type}       from "./Model";

export const RecwhaleAutocomplete: React.FC = () => {
    const Data: Item[] = [
        new Item(moment(), 1, "example", Type.Basic),
        new Item(moment("2021-12-31"), 2, "text", Type.QuiteBasic),
        new Item(moment("2021-12-28"), 3, "Item", Type.Basic),
        new Item(moment("2021-01-31"), 4, "Sample", Type.QuiteBasic)

    ]

    const [EnumChoice, setEnumChoice] = React.useState<Type | undefined>(undefined);
    const [AutocompleteChoice, setAutoCompleteChoice] = React.useState<Item | undefined>(undefined);

    const onChangeEnumPicker = (value?: Type) => {
        setEnumChoice(value);
    } 

    const onChangeAutocomplete = (value?: Item) => {
        setAutoCompleteChoice(value);
    } 


    return (
        <>
            <h3>recwhale-autocomplete-Enumpicker</h3>
            <div style={{height: 300, flexDirection: "column"}}>
                <h5>EnumPicker</h5>
                <div style={{ margin: "10px"}}>
                    <EnumPicker type={Type} name="Enumpicker" onChange={onChangeEnumPicker} optional />
                </div>
                <div style={{ margin: "10px"}}>
                    <EnumPicker type={Type} name="EnumPicker Default value" onChange={onChangeEnumPicker} optional defaultValue={Type.Basic}/>
                </div>
                <div style={{ margin: "10px"}}>
                    <span>EnumPicker choice value :{EnumChoice ? `${EnumChoice}` : "Value is not yet defined"}</span>
                </div>
                <h5>Autocomplte</h5>
                <div style={{ margin: "10px"}}>
                    <Autocomplete 
                        options={Data}
                        label="Autocomplete sample"
                        onChange={onChangeAutocomplete}
                        getOptionLabel={(i: Item) => i.text}
                        />
                </div>
                <div style={{ margin: "10px"}}>
                    <span>Autocomplete choice value :{AutocompleteChoice ? `${JSON.stringify(AutocompleteChoice)}` : "Value is not yet defined"}</span>
                </div>
            </div>
           
        </>
    );
};
