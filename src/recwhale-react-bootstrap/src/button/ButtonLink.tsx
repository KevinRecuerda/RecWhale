import type {IconProp}   from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React             from "react";
import {Link}            from "react-router-dom";

interface IButtonLinkProps {
    icon: IconProp;
    text?: string;
    value?: string;
    className?: string;
}

export function ButtonLink(props: IButtonLinkProps): JSX.Element {
    if (!props.value)
        return <></>;

    return (
        <span className={props.className}>
            <Link to={props.value} target="_blank">
                <FontAwesomeIcon icon={props.icon}/> {props.text}
            </Link>
        </span>
    );
}
