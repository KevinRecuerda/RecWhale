﻿// import moment         from "moment";
import React          from "react";
import {Table}        from "react-bootstrap";
import type {Size}    from "./Size";
import {SizeHelper}   from "./Size";
import "recwhale-ts";
import "./TableKV.scss";

export interface ITableKVProps {
    rows: [string, any][];
    title?: string;
    className?: string;
    size?: Size;
    smart?: boolean;
}

export const TableKV: React.FC<ITableKVProps> = (props) => {

    const renderValue = (key: string, value: any): any => {
        if (props.smart !== true || !value)
            return value; // eslint-disable-line @typescript-eslint/no-unsafe-return

        // const lowerKey = key.toLowerCase();
        // if (lowerKey.includes("date"))
        //     return moment(value).formatDate();
        //
        // const number = Number(value);
        // if (!isNaN(number)) {
        //     if (lowerKey.includes("weight"))
        //         return number.format("%", 4);
        //     return number.format();
        // }
        console.log(key);
        return value; // eslint-disable-line @typescript-eslint/no-unsafe-return
    };

    const width = SizeHelper.width(props.size ?? "xs");
    return (
        <div className={props.className}>
            {props.title && <h5>{props.title}</h5>}
            <Table striped bordered size="sm" className="text-small" style={{width: width}}>
                <tbody>
                {props.rows.map(([key, value]) =>
                                    <tr key={key}>
                                        <th className="min">{key}</th>
                                        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access */}
                                        <td>{renderValue(key, value)}</td>
                                    </tr>
                )}
                </tbody>
            </Table>
        </div>);
};