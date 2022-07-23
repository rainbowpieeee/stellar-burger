import React, { FunctionComponent } from "react";
import { IngredientCard } from "../components/ingredient-card/ingredient-card";
import styles from './order-stuff-page.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "../services/types/hooks";
import { TIngredient } from "../services/types/data";
import { calculateCost } from "../utils/utils";
import { WS_CONNECTION_START, WS_CLOSE_CONNECTION } from "../services/constants";
import {formatDate} from '../utils/utils'


///компонент для отдельной страницы по каждому заказу
export const OrderStuffPage: FunctionComponent = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START })

    return () => {
      dispatch({ type: WS_CLOSE_CONNECTION })
    }
  }, [dispatch])


  const { id } = useParams<{ id: string }>()
  const { ordersData } = useSelector(state => state.ordersFeed);
  const { ingredients } = useSelector(state => state.burgerData)

  const currentFeedOrder = ordersData?.orders.find(item => {
    return item._id === id
  })




  const currentItems: TIngredient[] = ingredients.filter(item => {
    return currentFeedOrder && currentFeedOrder.ingredients.indexOf(item._id) > -1
  })

  const totalCost = currentItems &&  calculateCost(currentItems.slice(1), currentItems[0]?.price)


  const style = currentFeedOrder?.status === 'done' ? `text text_type_main-default mb-15 ${styles.textgreen}` : `text text_type_main-default mb-15 ${styles.textwhite}`


  return (
    <div className={styles.conteiner}>
      <p className={` text text_type_digits-default mb-10 ${styles.idstyle}`} >#5545454</p>
      <h3 className="text text_type_main-medium mb-3" >{currentFeedOrder?.name}</h3>
      <p className={style}>{currentFeedOrder?.status === 'done' ? 'Выполнен' : 'Готовиться'}</p>
      <p className="text text_type_main-medium mb-6" >Состав:</p>

      <div className={`${styles.ingredients} mb-10`}>
        {currentItems.map((item, index) => (
          <IngredientCard key={index} type={item.type} images={item.image_mobile} name={item.name} price={item.price} />
        ))}
      </div>
      <div className={styles.dateandcost}>
        <p className="text text_type_main-default text_color_inactive" >{formatDate(currentFeedOrder?.createdAt)}</p>
        <div className={styles.box}>
          <p className="text text_type_digits-default mr-2">{totalCost}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>



    </div>
  )

}



