import React        from "react";
import {FaClone}    from "react-icons/fa";
import {IconType}   from "react-icons/lib";
import {ButtonIcon} from "./ButtonIcon";

interface IButtonCopyProps {
    value: string;
    icon?: IconType;
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

    return <ButtonIcon title="Copy to clipboard" variant="link"
                       icon={props.icon ?? FaClone}
                       run={async () => copyToClipBoard(props.value)}/>;
};
