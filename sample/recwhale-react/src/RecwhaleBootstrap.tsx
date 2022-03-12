import React                                                   from "react";
import {ButtonCopy, ButtonIcon, LinkIcon, SizeHelper, TableKV} from "recwhale-react-bootstrap";
import {FaRocket}                                              from "react-icons/fa";

export const RecwhaleBootstrap: React.FC = () => {
    const rows: [string, any][]          = [
        ["name", "kevin"],
        ["age", 29],
        ["birth date", "1992-08-19T12:00:00"],
        ["weight", 0.001]
    ];
    const bootstrapRows: [string, any][] = [
        ["SizeHelper.width(sm)", SizeHelper.width("sm")],
        ["ButtonIcon", <ButtonIcon icon={FaRocket} title="ButtonIcon" run={() => {}}/>],
        ["ButtonIcon sm", <ButtonIcon icon={FaRocket} title="ButtonIcon" run={() => {}} size="sm"/>],
        ["ButtonCopy", <ButtonCopy value="test"/>],
        ["ButtonCopy sm", <ButtonCopy value="test" size="sm"/>],
        ["LinkIcon", <LinkIcon icon={FaRocket} to="/test"/>]
    ];

    return (
        <>
            <blockquote className="blockquote-detail">recwhale-react-boostrap</blockquote>

            <TableKV title="TableKV with smart option" rows={rows} smart/>
            <hr/>
            <TableKV title="Components" rows={bootstrapRows} smart/>
        </>
    );
};