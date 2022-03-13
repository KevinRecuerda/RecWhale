import type {PropsWithChildren, RefAttributes}            from "react";
import React, {forwardRef, useImperativeHandle, useState} from "react";
import {FaExclamation}                                    from "react-icons/fa";
import type {IModalProps}                                 from "./IModalProps";
import {ModalAction}                                      from "./ModalAction";

interface IModalConfirmProps extends IModalProps {
    onAction: () => Promise<void> | void;
    warning?: string;
}

export interface IModalConfirmRef {
    open: () => void;
}

export interface IModalConfirm extends React.ForwardRefExoticComponent<PropsWithChildren<IModalConfirmProps> & RefAttributes<IModalConfirmRef>> {}

export const ModalConfirm: IModalConfirm = forwardRef((props, ref) => {

    const [show, setShow] = useState(false);
    const onClose = () => setShow(false);

    async function onAction() {
        onClose();
        await props.onAction();
    }

    useImperativeHandle(ref, () => ({
        open() { setShow(true); }
    }));

    return (
        <ModalAction title={props.title} onAction={onAction} show={show} onClose={() => onClose()} labelClose="cancel">
            {props.warning && <p className="text-warning"><FaExclamation/> {props.warning}</p>}
            {props.children}
        </ModalAction>
    );
});

ModalConfirm.displayName = "ModalConfirm";
