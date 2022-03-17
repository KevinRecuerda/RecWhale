import React, {useState}         from "react";
import {ButtonProps}             from "react-bootstrap/Button";
import {FaClone}                 from "react-icons/fa";
import {IconType}                from "react-icons/lib";
import {ButtonIcon}              from "./ButtonIcon";
import {TooltipText}             from "../tooltip";

interface IButtonCopyProps extends Pick<ButtonProps, 'size'> {
    value: string;
    icon?: IconType;
}

export const ButtonCopy: React.FC<IButtonCopyProps> = (props) => {
    if (!props.value)
        return <></>;

    const [success, setSuccess] = useState<boolean>();
    
    const title = success ? "Copied!" : "Failed to copy!";
    const copyToClipBoard = async (value: string) => {
        try {
            await navigator.clipboard.writeText(value);
            setSuccess(true);
        } catch (err) {
            setSuccess(false);
        }
        setTimeout(() => setSuccess(undefined), 2000);
    };
    
    return (
        <TooltipText placement="auto" show={success != null} title={title}>
            <ButtonIcon title="Copy to clipboard" variant="link" size={props.size}
                        icon={props.icon ?? FaClone}
                        run={async () => copyToClipBoard(props.value)}/>
        </TooltipText>
    );
};
