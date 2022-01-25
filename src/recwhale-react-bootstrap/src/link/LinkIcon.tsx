import React        from "react";
import {IconType}   from "react-icons/lib";
import {Link}       from "react-router-dom";

interface ILinkIconProps {
    to: string;
    icon: IconType;
    text?: string;
    className?: string;
}

export const LinkIcon: React.FC<ILinkIconProps> = (props) => {
    if (!props.to)
        return <></>;

    return (
        <span className={props.className}>
            <Link to={props.to} target="_blank">
                {props.icon}
                {props.text && <span className="ml-2">{props.text}</span>}
            </Link>
        </span>
    );
};
