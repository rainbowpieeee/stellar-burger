import consructorStyles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorItem } from '../constructor-item/constructor-item';
import { OrderRegistration } from '../order-registration/order-registration';
import { useDrop } from 'react-dnd';
import { ADD_ITEM, ADD_BUN, DELETE_INGREDIENT, CLEAN_STATE } from '../../services/actions/burger-consructor';
import { ADD_AMMOUNT, DECREASE_AMOUNT } from '../../services/actions/burger-ingredients';
import { Modal } from '../modal/modal';
import React from 'react';
import { OrderDetails } from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { OPEN_ORDER_POPUP, CLOSE_ORDER_POPUP } from '../../services/actions/order-details';
import { getOrderNumber } from '../../services/actions/order-details';
import { calculateCost } from '../utils/utils';



export function BurgerConstructor() {
  const dispatch = useDispatch();
  const { orderButtonIsClicked, requestIsSuccessed, orderNumber } = useSelector(state => state.currentOrder);
  const { ingredients } = useSelector(state => state.burgerData);
  const { orderRequest } = useSelector(state => state.currentOrder)
  const { elements, bun } = useSelector(state => state.constructorState);

  ///вычисляем значения для ключей
  const uid = React.useMemo(() => {
    return Date.now() * Math.random()
  }, [elements])

  const [{ isDrag }, dropTarget] = useDrop({
    accept: 'item',
    collect: monitor => ({
      isDrag: monitor.canDrop()
    }),
    drop(itemId) {
      dispatch({
        type: ADD_ITEM, data: ingredients.filter(item => {
          return item._id === itemId.id && item.type !== 'bun'
        }).map((item) => { return { ...item, uid: uid } })
      })
      dispatch({
        type: ADD_BUN, bunItem: ingredients.find(item => {
          return item._id === itemId.id && item.type === 'bun'
        })
      })
      dispatch({ type: ADD_AMMOUNT, id: itemId.id })
    }
  });

  ///удаляем ингредиент из конструктора и меняем значение счетчика
  const itemRemove = React.useCallback((itemKey, itemId) => {
    dispatch({ type: DELETE_INGREDIENT, id: itemKey });
    dispatch({ type: DECREASE_AMOUNT, id: itemId });
  }, [dispatch])

  ///логика открытия попапа с номером заказа
  const orderDetailsRequestSending = React.useCallback(() => {
    const idArray = elements.map(item => { return item._id })
    dispatch({ type: OPEN_ORDER_POPUP });
    dispatch(getOrderNumber([...idArray, bun._id]));
  }, [dispatch, elements, bun._id])

  ///логика закрытия попапа
  const orderPopupClose = React.useCallback(() => {
    dispatch({ type: CLOSE_ORDER_POPUP });
    dispatch({ type: CLEAN_STATE });
  })

  const style = isDrag ? consructorStyles.burgerconstructor__dropconteiner : consructorStyles.burgerconstructor__conteiner
  const cartStyle = elements.length >= 6 ? consructorStyles.burgerconstructor__elementswithscroll : consructorStyles.burgerconstructor__elements



  return (
    elements && <div ref={dropTarget} className={`pl-4   ml-10 pt-25 ${style}`}>
      {bun && Array.of(bun).map(item => (
        <ConstructorElement key={uid} type="top" isLocked={true} text={item.name} price={item.price} thumbnail={item.image_mobile} />
      ))
      }
      <ul className={`pr-4 mr-4 ${cartStyle}`}>
        {elements.filter(item => { return item.type !== 'bun' }).map((item, index) => (
          <ConstructorItem id={item.uid} index={index} key={item.uid}>
            <ConstructorElement id={item.uid} text={item.name} thumbnail={item.image_mobile} price={item.price} handleClose={() => itemRemove(item.uid, item._id)} />
          </ConstructorItem>))}
      </ul>
      {bun && Array.of(bun).map(item => (
        <ConstructorElement key={uid} type="bottom" isLocked={true} text={item.name} price={item.price} thumbnail={item.image_mobile} />))}
      <OrderRegistration clickHandler={orderDetailsRequestSending} styles={`mt-10 ${consructorStyles.burgerconstructor__cost}`} cost={calculateCost(elements, bun.price)} />
      {orderButtonIsClicked && requestIsSuccessed && <Modal closeModal={orderPopupClose} modalHeaderStyles={consructorStyles.burgerconstructor__modalheader}><OrderDetails number={orderNumber} /></Modal>}
    </div >


  )
}


