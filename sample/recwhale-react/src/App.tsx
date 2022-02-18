import React               from "react";
import {Tab, Tabs}         from "react-bootstrap";
import {RecwhaleTs}        from "./RecwhaleTs";
import {RecwhaleBootstrap} from "./RecwhaleBootstrap";
import {RecwhaleAg}        from "./RecwhaleAg";
import "recwhale-ts";
import "recwhale-react-ag-grid/dist/style.css";
import "recwhale-react-bootstrap/dist/style.css";
import "./styles.css";
import { RecwhaleAutocomplete } from "./RecwhaleAutocomplete";

export const App: React.FC = () => {
    const packages = new Map<string, JSX.Element>(
        [
            ["ts", <RecwhaleTs/>],
            ["react-bootstrap", <RecwhaleBootstrap/>],
            ["react-ag-grid", <RecwhaleAg/>],
            ["react-autcomplete", <RecwhaleAutocomplete />]
        ]);

    return (
        <div className="container">
            <h1>RECWHALE</h1>
            <p>some examples</p>

            <Tabs defaultActiveKey="ts">
                {[...packages.entries()].map(([name, component]) => (
                    <Tab key={name} eventKey={name} title={name}>
                        {component}
                    </Tab>
                ))}
            </Tabs>
        </div>
    );
};
