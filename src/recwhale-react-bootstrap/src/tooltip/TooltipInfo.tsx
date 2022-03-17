import React                            from "react";
import {ITooltipTextProps, TooltipText} from "./TooltipText";
import { FaInfoCircle}                  from "react-icons/all";

export const TooltipInfo: React.FC<ITooltipTextProps> = (props) => {
    return (
        <TooltipText {...props}>
            <FaInfoCircle />
        </TooltipText>
    );
};
