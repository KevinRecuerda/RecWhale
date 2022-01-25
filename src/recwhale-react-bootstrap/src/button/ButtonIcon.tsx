import React, {useState}  from "react";
import type {ButtonProps} from "react-bootstrap";
import {Button, Spinner}  from "react-bootstrap";
import {IconType}         from "react-icons/lib";
import "./ButtonIcon.scss";

export interface IButtonIconProps extends ButtonProps {
    icon: IconType;
    title: string;
    run: () => Promise<void> | void;
}

export const ButtonIcon: React.FC<IButtonIconProps> = (props) => {

    const {run, icon, ...innerProps} = props;

    const [isRunning, setIsRunning] = useState<boolean>();

    async function onClick() {
        setIsRunning(true);
        await props.run();
        setIsRunning(false);
    }

    const variant      = props.variant ?? "primary";
    let spinnerVariant = variant.toString();

    if (spinnerVariant.startsWith("outline-"))
        spinnerVariant = spinnerVariant.substring(8);
    else if (spinnerVariant.startsWith("flat-"))
        spinnerVariant = spinnerVariant.substring(5);
    
    const Icon = icon;

    return (
        <Button variant={variant} disabled={isRunning} onClick={onClick} {...innerProps}>
            {props.children && <span className="mr-2">{props.children}</span>}
            {isRunning
             ? <Spinner className="pull-right" animation="border" variant={spinnerVariant}/>
             : <Icon className="pull-right fa-w-16"/>
            }
        </Button>
    );
};
