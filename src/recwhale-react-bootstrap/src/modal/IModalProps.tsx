import type {ModalProps} from "react-bootstrap";

export interface IModalProps extends ModalProps {
    title: string;
    canExecute?: boolean;
}
