import {GridApi, RowNode}  from "ag-grid-community";
import moment              from "moment";
import React               from "react";
import {Row}               from "react-bootstrap";
import {FaRocket}          from "react-icons/fa";
import {Ag, AgCol, AgCrud} from "recwhale-react-ag-grid";
import {Item, Type}        from "./Model";

export const RecwhaleAg: React.FC = () => {
    let rows = [
        new Item(moment(), 1, "example", Type.Basic),
        new Item(moment("2021-12-31"), 20, "text", Type.QuiteBasic)
    ];

    for (let i = 0; i < 5; i++)
        rows = [...rows, ...rows];

    async function refresh(): Promise<any[]> {
        return rows;
    }

    return (
        <>
            <blockquote className="blockquote-detail">recwhale-react-ag-grid</blockquote>

            <Row>
                <div className="col-6 mb-3" style={{height: 300}}>
                    <Ag rowData={rows}>
                        <AgCol.Date field="date"/>
                        <AgCol.Number field="number"/>
                        <AgCol.Text field="text"/>
                        <AgCol.Action field="number" headerName="Action" icon={FaRocket} onClick={(node: RowNode, ag: GridApi) => console.log(node, ag)}/>
                    </Ag>
                </div>

                <div className="col-6 mb-3" style={{height: 300}}>
                    <Ag rowData={rows}>
                        <AgCol.Default headerName="GROUP 1">
                            <AgCol.Date field="date"/>
                            <AgCol.Number field="number"/>
                        </AgCol.Default>
                        <AgCol.Default headerName="GROUP 2">
                            <AgCol.Text field="text"/>
                        </AgCol.Default>
                        <AgCol.Action field="number" headerName="Action" icon={FaRocket} onClick={(node: RowNode, ag: GridApi) => console.log(node, ag)}/>
                    </Ag>
                </div>

                <div className="col-6 mb-3" style={{height: 300}}>
                    <Ag rowData={rows}>
                        <AgCol.Date field="date" rowGroup/>
                        <AgCol.Number field="number"/>
                        <AgCol.Text field="text"/>
                        <AgCol.Action field="number" headerName="Action" icon={FaRocket} onClick={(node: RowNode, ag: GridApi) => console.log(node, ag)}/>
                    </Ag>
                </div>

                <div className="col-6 mb-3" style={{height: 300}}>
                    <AgCrud refresh={refresh} rowData={rows} >
                        <AgCol.Date field="date"/>
                        <AgCol.Number field="number"/>
                        <AgCol.Text field="text"/>
                        <AgCol.Action field="number" headerName="Action" icon={FaRocket} onClick={(node: RowNode, ag: GridApi) => console.log(node, ag)}/>
                    </AgCrud>
                </div>
            </Row>

            <hr/>
        </>
    );
};
