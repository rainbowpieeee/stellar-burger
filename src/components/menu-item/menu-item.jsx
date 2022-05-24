import React from "react";
import PropTypes from 'prop-types';

export function MenuItem(props) {
    return (
        <li className={props.styles}>
            {props.children}
            {props.text && <p className={props.textStyles}>{props.text}</p>}
        </li>
    )
}

MenuItem.propTypes = {
    styles: PropTypes.string,
    children: PropTypes.object.isRequired,
    text: PropTypes.string,
    textStyles: PropTypes.string
}