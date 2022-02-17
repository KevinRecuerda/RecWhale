import {GridApi, RowNode} from "ag-grid-community";
import moment             from "moment";
import React              from "react";
import {FaRocket}         from "react-icons/fa";
import {Ag, AgCol}        from "recwhale-react-ag-grid";
import {Item, Type}       from "./Model";

import "ag-grid-community/dist/styles/ag-grid.min.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.min.css";

export const RecwhaleAg: React.FC = () => {
    const rows = [
        new Item(moment(), 1, "example", Type.Basic),
        new Item(moment("2021-12-31"), 20, "text", Type.QuiteBasic)
    ];

    return (
        <>
            <h3>recwhale-react-ag-grid</h3>

            <div style={{height: 300}}>
                <Ag rowData={rows}>
                    <AgCol.Date field="date"/>
                    <AgCol.Number field="number"/>
                    <AgCol.Text field="text"/>
                    <AgCol.Action
                        field="number"
                        headerName="Action"
                        icon={FaRocket}
                        onClick={(node: RowNode, ag: GridApi) => console.log(node, ag)}//n => console.log(n)}
                    />
                </Ag>
            </div>
        </>
    );
};
