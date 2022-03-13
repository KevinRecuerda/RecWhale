import React, {useState}  from "react";
import type {ButtonProps} from "react-bootstrap";
import {Button, Spinner}  from "react-bootstrap";
import {IconType}         from "react-icons/lib";
import "./ButtonIcon.scss";
import {SizeHelper}       from "../Size";

export interface IButtonIconProps extends ButtonProps {
    run: () => Promise<void> | void;
    icon: IconType;
    title?: string;
}

export const ButtonIcon: React.FC<IButtonIconProps> = (props) => {

    const [isRunning, setIsRunning] = useState<boolean>();

    async function onClick() {
        setIsRunning(true);
        await props.run();
        setIsRunning(false);
    }

    const variant      = props.variant ?? "primary";
    let spinnerVariant = variant.toString();

    const supportedPrefix = ["outline", "flat", "light"];
    for (const prefix in supportedPrefix) {
        if (spinnerVariant.startsWith(`${prefix}-`))
            spinnerVariant = spinnerVariant.substring(prefix.length + 1);
    }

    const Icon = props.icon;
    const iconSize = SizeHelper.fonts.get(props.size ?? "md")!;

    return (
        <Button variant={variant} disabled={isRunning} onClick={onClick} {...props}>
            {props.children && <span className="mr-1">{props.children}</span>}
            {isRunning
             ? <Spinner className="pull-right" animation="border" variant={spinnerVariant}/>
             : <Icon className="pull-right" size={iconSize}/>
            }
        </Button>
    );
};
