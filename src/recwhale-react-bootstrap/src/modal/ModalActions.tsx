import React, {useEffect, useState} from "react";
import {Button, Modal}              from "react-bootstrap";
import {IModalProps}                from "./IModalProps";

export interface IModalActionsProps extends IModalProps {
    actions?: JSX.Element;
    onClose?: () => void;
    labelClose?: string;
    noClose?: boolean;
}

export const ModalActions: React.FC<IModalActionsProps> = (props) => {

    const [show, setShow] = useState<boolean>();
    useEffect(() => setShow(props.show), [props.show]);

    const onClose = () => {
        setShow(false);
        props.onClose?.();
    };

    const canExecute = props.canExecute ?? true;

    return <Modal {...props} show={show} onHide={onClose} size={props.size ?? "lg"}>
        <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.children}
        </Modal.Body>
        <Modal.Footer>
            {!props.noClose && <Button onClick={onClose} variant="secondary">{props.labelClose ?? "close"}</Button>}
            {canExecute && props.actions}
        </Modal.Footer>
    </Modal>;
};
