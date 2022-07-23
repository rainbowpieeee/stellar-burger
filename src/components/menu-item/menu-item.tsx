import React from "react";

import { IMenuItem } from "../../utils/interfaces";

export  function MenuItem(props: IMenuItem) {

  return (
    <li className={props.styles}>
      {props.children}
      {props.text && <p  className={props.textStyles} >{props.text}</p>}
    </li>
  )
}

