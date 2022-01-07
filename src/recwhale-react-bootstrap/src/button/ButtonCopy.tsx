import type {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {faClone}             from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon}     from "@fortawesome/react-fontawesome";
import React                 from "react";
import {Button}              from "react-bootstrap";

interface IButtonCopyProps {
    value?: string | number;
    icon?: IconDefinition;
}

export const ButtonCopy: React.FC<IButtonCopyProps> = (props) => {
    if (!props.value)
        return <></>;

    const copyToClipBoard = async (value?: string | number) => {
        try {
            await navigator.clipboard.writeText(value?.toString() ?? "");
        } catch (err) {
            console.log("Failed to copy!", err);
        }
    };

    return <Button title="Copy to clipboard" variant="link" onClick={async () => copyToClipBoard(props.value)}>
        <FontAwesomeIcon icon={props.icon ?? faClone}/>
    </Button>;
};
