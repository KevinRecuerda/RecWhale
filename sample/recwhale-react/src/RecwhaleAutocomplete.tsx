import moment                     from "moment";
import React                      from "react";
import {Badge}                    from "react-bootstrap";
import {EnumPicker, Autocomplete} from "recwhale-react-autocomplete";
import {TableKV}                  from "recwhale-react-bootstrap";
import {AnotherType, Item, Type}  from "./Model";

export const RecwhaleAutocomplete: React.FC = () => {
    const data: Item[] = [
        new Item(moment(), 1, "example", Type.Basic),
        new Item(moment("2021-12-31"), 2, "text", Type.QuiteBasic),
        new Item(moment("2021-12-28"), 3, "Item", Type.Basic),
        new Item(moment("2021-01-31"), 4, "Sample", Type.QuiteBasic)

    ];

    const [, setEnumChoice]         = React.useState<Type | undefined>(undefined);
    const [, setEnumMultipleChoice] = React.useState<Type[]>([]);
    const [, setAnotherEnumChoice]  = React.useState<AnotherType | undefined>(undefined);
    const [, setAutocompleteChoice] = React.useState<Item | undefined>(undefined);

    const onChangeAutocomplete = (value?: Item) => {
        setAutocompleteChoice(value);
    };

    const rows: [string, any][] = [
        ["EnumPicker - optional", <EnumPicker type={Type} name="type" onChange={setEnumChoice} optional/>],
        ["EnumPicker - default value", <EnumPicker type={Type} name="type" onChange={setEnumChoice} defaultValue={Type.Basic}/>],
        ["EnumPicker - multiple", <EnumPicker type={Type} name="type" onChange={setEnumMultipleChoice} multiple/>],
        ["EnumPicker - url Loader", <EnumPicker type={AnotherType} name="another type" onChange={setAnotherEnumChoice}/>],

        ["Autocomplete", <Autocomplete options={data} label="item" onChange={onChangeAutocomplete}
                                       getOptionLabel={(i: Item) => i.text}/>],
        ["Autocomplete - render", <Autocomplete options={data} label="item" onChange={onChangeAutocomplete}
                                                renderOption={(i: Item) =>
                                                    <>
                                                        {i.text}
                                                        <Badge pill variant="secondary" className="ml-2">{i.type}</Badge>
                                                    </>
                                                }/>]
    ];


    return (
        <>
            <blockquote className="blockquote-detail">recwhale-react-autocomplete</blockquote>

            <TableKV rows={rows}/>
        </>
    );
};
