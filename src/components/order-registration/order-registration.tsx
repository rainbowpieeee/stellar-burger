import React, { FunctionComponent } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import image from '../../images/Subtract.svg';
import { useSelector } from "../../services/types/hooks";
import { IOrderRegistration } from "../../utils/interfaces";

export const OrderRegistration: FunctionComponent<IOrderRegistration> = (props) => {
  const { orderButtonIsClicked, requestIsSuccessed } = useSelector(store => store.currentOrder)

  return (
    <div className={props.styles}>
      <p className='text text_type_digits-medium mr-2'>{props.cost}</p>
      <img src={image} alt='icon' />
      <div className='ml-10'>
        <Button type="primary" size="large" disabled={orderButtonIsClicked && requestIsSuccessed} onClick={() => props.clickHandler()}>Оформить заказ</Button>
      </div>
    </div>

  )
}

