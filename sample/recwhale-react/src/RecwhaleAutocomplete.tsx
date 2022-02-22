import React                           from "react";
import {Badge}                         from "react-bootstrap";
import {EnumPicker, Autocomplete}      from "recwhale-react-autocomplete";
import {TableKV}                       from "recwhale-react-bootstrap";
import {AnotherType, data, Item, Type} from "./Model";

export const RecwhaleAutocomplete: React.FC = () => {

    const [options] = React.useState<Item[]>(data);

    const [, setEnum]         = React.useState<Type>();
    const [, setEnum2]        = React.useState<Type>();
    const [, setEnumMultiple] = React.useState<Type[]>([]);
    const [, setEnumAnother]  = React.useState<AnotherType>();

    const [, setAutocomplete]          = React.useState<Item>();
    const [, setAutocomplete2]         = React.useState<Item>();
    const [, setAutocompleteMultiple]  = React.useState<Item[]>();
    const [, setAutocompleteMultiple2] = React.useState<Item[]>();

    const rows: [string, any][] = [
        ["EnumPicker - optional", <EnumPicker type={Type} name="type" onChange={setEnum} optional/>],
        ["EnumPicker - default value", <EnumPicker type={Type} name="type" onChange={setEnum2} defaultValue={Type.Basic}/>],
        ["EnumPicker - multiple", <EnumPicker type={Type} name="type" onChange={setEnumMultiple} multiple/>],
        ["EnumPicker - url Loader", <EnumPicker type={AnotherType} name="another type" onChange={setEnumAnother}/>],
        ["", ""],
        ["Autocomplete", <Autocomplete options={options} label="item" onChange={setAutocomplete}
                                       getOptionSelected={(option: Item, value: Item) => option.id === value.id}
                                       getOptionLabel={(i: Item) => i.text}
                                       urlLoader={{label: "itemIds", keySelector: (item: Item) => item.id}}
        />],
        ["Autocomplete - multiple", <Autocomplete options={options} label="item" multiple onChange={setAutocompleteMultiple}
                                                  getOptionSelected={(option: Item, value: Item) => option.id === value.id}
                                                  getOptionLabel={(i: Item) => i.text}
        />],
        ["Autocomplete - render", <Autocomplete options={options} label="item" onChange={setAutocomplete2}
                                                getOptionSelected={(option: Item, value: Item) => option.id === value.id}
                                                renderOption={(i: Item) =>
                                                    <>
                                                        {i.text}
                                                        <Badge pill variant="secondary" className="ml-2">{i.type}</Badge>
                                                    </>
                                                }
        />],
        ["Autocomplete - group", <Autocomplete options={options} label="item" multiple onChange={setAutocompleteMultiple2}
                                               getOptionSelected={(option: Item, value: Item) => option.id === value.id}
                                               renderOption={(i: Item) =>
                                                   <>
                                                       {i.text}
                                                       <Badge pill variant="secondary" className="ml-2">{i.type}</Badge>
                                                   </>
                                               }
                                               groupBy={(i: Item) => i.type}
        />]
    ];


    return (
        <>
            <blockquote className="blockquote-detail">recwhale-react-autocomplete</blockquote>

            <TableKV rows={rows}/>
        </>
    );
};
