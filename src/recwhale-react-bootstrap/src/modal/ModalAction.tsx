import React                              from "react";
import {Button}                           from "react-bootstrap";
import {IModalActionsProps, ModalActions} from "./ModalActions";

interface IModalActionProps extends IModalActionsProps {
    onAction?: (() => Promise<void>) | (() => void);
    labelAction?: string;
}

export const ModalAction: React.FC<IModalActionProps> = (props) => {

    const okLabel  = props.labelAction ?? "ok";
    const okButton = props.onAction && <Button title={okLabel} onClick={() => props.onAction?.()}>{okLabel}</Button>;
    return <ModalActions {...props} actions={okButton}/>;
};

