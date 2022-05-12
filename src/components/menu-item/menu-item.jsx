import React from "react";

export function MenuItem (props) {
    return (
        <li className={props.styles}>
            {props.children}
            {props.text && <p className={props.textStyles}>{props.text}</p>}
        </li>
    )
}