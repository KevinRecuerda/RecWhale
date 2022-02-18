import React, {useState}         from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {ButtonProps}             from "react-bootstrap/Button";
import {OverlayInjectedProps}    from "react-bootstrap/Overlay";
import {FaClone}                 from "react-icons/fa";
import {IconType}                from "react-icons/lib";
import {ButtonIcon}              from "./ButtonIcon";

interface IButtonCopyProps extends Pick<ButtonProps, 'size'> {
    value: string;
    icon?: IconType;
}

export const ButtonCopy: React.FC<IButtonCopyProps> = (props) => {
    if (!props.value)
        return <></>;

    const [success, setSuccess] = useState<boolean>();

    const copyToClipBoard = async (value: string) => {
        try {
            await navigator.clipboard.writeText(value);
            setSuccess(true);
        } catch (err) {
            setSuccess(false);
        }
        setTimeout(() => setSuccess(undefined), 2000);
    };

    const renderTooltip = (p: OverlayInjectedProps): React.ReactNode => (
        <Tooltip id="tooltip" {...p}>
            {success ? "Copied!" : "Failed to copy!"}
        </Tooltip>
    );

    return (
        <OverlayTrigger placement="auto" show={success != null} overlay={renderTooltip}>
            <ButtonIcon title="Copy to clipboard" variant="link" size={props.size}
                        icon={props.icon ?? FaClone}
                        run={async () => copyToClipBoard(props.value)}/>
        </OverlayTrigger>
    );
};
