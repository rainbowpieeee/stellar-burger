import consructorStyles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorItem } from '../constructor-item/constructor-item';
import { OrderRegistration } from '../order-registration/order-registration';
import { useDrop } from 'react-dnd';
import { ADD_ITEM, ADD_BUN, DELETE_INGREDIENT, CLEAN_STATE } from '../../services/constants/index';
import { ADD_AMMOUNT, DECREASE_AMOUNT, CLEAN_INGREDIENTS_AMOUNTS } from '../../services/constants/index';
import { Modal } from '../modal/modal';
import React, { FunctionComponent } from 'react';
import { OrderDetails } from '../order-details/order-details';
import { useSelector, useDispatch } from '../../services/types/hooks';
import { OPEN_ORDER_POPUP, CLOSE_ORDER_POPUP } from '../../services/constants/index';
import { getOrderNumber } from '../../services/actions/order-details';
import { calculateCost } from '../../utils/utils';
import { getCookie, refreshMainToken } from '../../utils/utils';
import Api from '../../utils/Api';
import { useHistory } from 'react-router-dom';


export const BurgerConstructor: FunctionComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { orderButtonIsClicked, requestIsSuccessed, orderNumber } = useSelector(state => state.currentOrder);
  const { ingredients } = useSelector(state => state.burgerData);
  const { elements, bun } = useSelector(state => state.constructorState);

  const token = getCookie('token')
  const refresh = getCookie('refreshToken')
  ///вычисляем значения для ключей
  function uid(): number {
    return Date.now() * Math.random()
  }

  const [{ isDrag }, dropTarget] = useDrop({
    accept: 'item',
    collect: monitor => ({
      isDrag: monitor.canDrop()
    }),
    drop(itemId: { id: string }) {
      dispatch({
        type: ADD_ITEM, data: ingredients.filter(item => {
          return item._id === itemId.id && item.type !== 'bun'
        }).map((item) => { return { ...item, uid: uid() } })
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
  const itemRemove = React.useCallback((itemKey: number, itemId: string) => {
    dispatch({ type: DELETE_INGREDIENT, id: itemKey });
    dispatch({ type: DECREASE_AMOUNT, id: itemId });
  }, [dispatch])

  ///логика открытия попапа с номером заказа
  const orderDetailsRequestSending = () => {


    const idArray = elements.map(item => { return item._id })
    dispatch({ type: OPEN_ORDER_POPUP });
    dispatch(getOrderNumber([...idArray, bun._id], token, refresh, refreshMainToken));


  }

  ///логика закрытия попапа
  const orderPopupClose = React.useCallback(() => {
    dispatch({ type: CLOSE_ORDER_POPUP });
    dispatch({ type: CLEAN_STATE });
    dispatch({ type: CLEAN_INGREDIENTS_AMOUNTS })
  }, [dispatch])

  const style = isDrag ? consructorStyles.burgerconstructor__dropconteiner : consructorStyles.burgerconstructor__conteiner
  const cartStyle = elements.length >= 6 ? consructorStyles.burgerconstructor__elementswithscroll : consructorStyles.burgerconstructor__elements



  return (
    elements && <div ref={dropTarget} className={`pl-4   ml-10 pt-25 ${style}`}>
      {bun && bun._id && Array.of(bun).map((item, index) => (
        <ConstructorElement key={index} type="top" isLocked={true} text={`${item.name} (верх)`} price={item.price} thumbnail={item.image_mobile} />
      ))
      }
      <ul className={`pr-4 mr-4 ${cartStyle}`}>
        {elements.filter(item => { return item.type !== 'bun' }).map((item, index) => (
          <ConstructorItem id={item.uid} index={index} key={item.uid}>
            <ConstructorElement text={item.name} thumbnail={item.image_mobile} price={item.price} handleClose={() => itemRemove(item.uid, item._id)} />
          </ConstructorItem>))}
      </ul>
      {bun && bun._id && Array.of(bun).map((item, index) => (
        <ConstructorElement key={index} type="bottom" isLocked={true} text={`${item.name} (низ)`} price={item.price} thumbnail={item.image_mobile} />))}
      <OrderRegistration clickHandler={() => {
        getCookie('refreshToken') === undefined ? history.replace({ pathname: '/login' }) : orderDetailsRequestSending()
      }} styles={`mt-10 ${consructorStyles.burgerconstructor__cost}`} cost={calculateCost(elements, bun.price)} />
      {orderButtonIsClicked && requestIsSuccessed && <Modal closeModal={orderPopupClose} modalHeaderStyles={consructorStyles.burgerconstructor__modalheader}><OrderDetails number={orderNumber} /></Modal>}
    </div >


  )
}


