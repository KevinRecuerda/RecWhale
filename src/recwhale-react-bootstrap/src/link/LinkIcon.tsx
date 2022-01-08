import React        from "react";
import {IconType}   from "react-icons/lib";
import {Link}       from "react-router-dom";

interface ILinkIconProps {
    value: string;
    icon: IconType;
    text?: string;
    className?: string;
}

export const LinkIcon: React.FC<ILinkIconProps> = (props) => {
    if (!props.value)
        return <></>;

    return (
        <span className={props.className}>
            <Link to={props.value} target="_blank">
                {props.icon} {props.text}
            </Link>
        </span>
    );
};
