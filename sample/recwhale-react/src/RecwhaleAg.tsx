import {GridApi, RowNode}  from "ag-grid-community";
import React               from "react";
import {Row}               from "react-bootstrap";
import {FaRocket}          from "react-icons/fa";
import {Ag, AgCol, AgCrud} from "recwhale-react-ag-grid";
import {dataMany, Item}    from "./Model";

export const RecwhaleAg: React.FC = () => {

    const [rows] = React.useState<Item[]>(dataMany);

    async function refresh(): Promise<any[]> {
        return rows;
    }

    return (
        <>
            <blockquote className="blockquote-detail">recwhale-react-ag-grid</blockquote>

            <Row>
                <div className="col-6 mb-3" style={{height: 300}}>
                    <Ag rowData={rows}>
                        <AgCol.Date field="date" view="instant" headerName="Date instant"/>
                        <AgCol.Date field="date"/>
                        <AgCol.Number field="number" fractionDigits={3}/>
                        <AgCol.Number unit="%" field="number" fractionDigits={2} />
                        <AgCol.Text field="text"/>
                        <AgCol.Action field="number" headerName="Action" icon={FaRocket} showValue width={100}
                                      onClick={(node: RowNode, ag: GridApi) => console.log(node, ag)}/>
                    </Ag>
                </div>

                <div className="col-6 mb-3" style={{height: 300}}>
                    <Ag rowData={rows}>
                        <AgCol.Default headerName="HEADER GROUP 1">
                            <AgCol.Date field="date"/>
                            <AgCol.Number field="number"/>
                        </AgCol.Default>
                        <AgCol.Default headerName="HEADER GROUP 2">
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
                    <AgCrud refresh={refresh} rowData={rows}>
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
