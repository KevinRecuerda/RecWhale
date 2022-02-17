import React        from "react";
import {IconType}   from "react-icons/lib";

interface ILinkIconProps {
    to: string;
    icon: IconType;
    text?: string;
    className?: string;
}

export const LinkIcon: React.FC<ILinkIconProps> = (props) => {
    if (!props.to)
        return <></>;

    const Icon = props.icon;
    return (
        <span className={props.className}>
            <a href={props.to} target="_blank">
                <Icon />
                {props.text && <span className="ml-2">{props.text}</span>}
            </a>
        </span>
    );
};
