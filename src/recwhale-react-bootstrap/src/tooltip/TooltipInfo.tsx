import React                            from "react";
import {ITooltipTextProps, TooltipText} from "./TooltipText";
import { FaInfoCircle}                  from "react-icons/all";

interface ITooltipInfoProps extends Omit<ITooltipTextProps, "children"> {}

export const TooltipInfo: React.FC<ITooltipInfoProps> = (props) => {
    return (
        <TooltipText {...props}>
            <span><FaInfoCircle /></span>
        </TooltipText>
    );
};
