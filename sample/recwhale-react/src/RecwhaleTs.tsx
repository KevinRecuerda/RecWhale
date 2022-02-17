import React                from "react";
import moment               from "moment";
import {Table}              from "react-bootstrap";
import {EnumHelper, nameof} from "recwhale-ts";
import {Item, Type}         from "./Model";
import "recwhale-ts";

export const RecwhaleTs: React.FC = () => {
    const arr    = ["a", "b", "c"];
    const date   = moment();
    const tsRows = [
        ["arr.firstOrDefault()", arr, arr.firstOrDefault()],
        ["date.formatDate()", date.format(), date.formatDate()],
        [
            "EnumHelper.format(x)",
            Type.QuiteBasic,
            EnumHelper.format(Type.QuiteBasic)
        ],
        ["nameof<>(string)", nameof<Item>(x => x.text)]
    ];

    return (
        <>
            <h3>recwhale-ts</h3>
            <Table size="sm" striped bordered>
                <tbody>
                {tsRows.map((r, i) => (
                    <tr key={i}>
                        {r.map((c, j) => (
                            <td key={j}>{c}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
};
