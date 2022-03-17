import React                                                                             from "react";
import {ButtonCopy, ButtonIcon, LinkIcon, SizeHelper, TableKV, TooltipInfo, TooltipText} from "recwhale-react-bootstrap";
import {useRerender}                                                                     from "recwhale-react-core";
import {FaRocket}                                                                        from "react-icons/fa";

export const RecwhaleBootstrap: React.FC = () => {

    const rerender = useRerender();

    const rows: [string, any][]          = [
        ["name", "kevin"],
        ["age", 29],
        ["birth date", "1992-08-19T12:00:00"],
        ["weight", 0.001]
    ];
    const bootstrapRows: [string, any][] = [
        ["SizeHelper.width(sm)", SizeHelper.width("sm")],
        ["ButtonIcon", <ButtonIcon icon={FaRocket} title="ButtonIcon" run={rerender}/>],
        ["ButtonIcon sm", <ButtonIcon icon={FaRocket} title="ButtonIcon" run={() => {}} size="sm"/>],
        ["ButtonCopy", <ButtonCopy value="test"/>],
        ["ButtonCopy sm", <ButtonCopy value="test" size="sm"/>],
        ["Tooltip text", <TooltipText title={"recwhale-react-bootstrap"}><span>recwhale-react-bootstrap</span></TooltipText>],
        ["TooltipInfo", <TooltipInfo title={"recwhale-react-bootstrap"} />],
        ["LinkIcon", <LinkIcon icon={FaRocket} to="/test" tooltip="go to test"/>],
        ["icon", <FaRocket/>],
        ["icon sm", <FaRocket size={SizeHelper.fonts.get("sm")}/>]
    ];

    console.log("--render");

    return (
        <>
            <blockquote className="blockquote-detail">recwhale-react-boostrap</blockquote>
            
            <TableKV title="TableKV with smart option" rows={rows} smart/>
            <hr/>
            <TableKV title="Components" rows={bootstrapRows} smart/>
        </>
    );
};
