import React                     from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {OverlayInjectedProps}    from "react-bootstrap/Overlay";
import {OverlayTriggerProps}     from "react-bootstrap/OverlayTrigger";
import {ButtonVariant}           from "react-bootstrap/types";


export interface ITooltipTextProps extends Omit<OverlayTriggerProps, 'overlay'> {
    title: string;
    variant?: ButtonVariant;
}

export const TooltipText: React.FC<ITooltipTextProps> = (props) => {
    const renderTooltip = (propsInjected: OverlayInjectedProps) => (
        <Tooltip id={`tooltip-${props.title}`} className={`text-${props.variant}`} {...propsInjected}>
            {props.title}
        </Tooltip>
    );

    return (
        <OverlayTrigger {...props} overlay={renderTooltip}>
            {props.children}
        </OverlayTrigger>
    );
};
