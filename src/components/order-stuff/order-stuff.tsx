import React, { FunctionComponent } from "react";
import styles from './order-stuff.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientCard } from "../ingredient-card/ingredient-card";
import { useParams } from "react-router-dom";
import { useSelector } from "../../services/types/hooks";
import { TIngredient } from "../../services/types/data";
import { calculateCost } from "../../utils/utils";
import { formatDate } from '../../utils/utils';

///компонент для отображения состава заказа в модальноим окне
export const OrderStuff: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>()
  const { ordersData } = useSelector(state => state.ordersFeed);
  const { ingredients } = useSelector(state => state.burgerData)

  const currentFeedOrder = ordersData && ordersData?.orders.find(item => {
    return item._id === id
  })




  const currentItems: TIngredient[] = ingredients.filter(item => {
    return currentFeedOrder !== undefined && currentFeedOrder !== null && currentFeedOrder.ingredients.indexOf(item._id) > -1
  })

  const totalCost = currentItems !== undefined && calculateCost(currentItems.slice(1), currentItems[0].price)


  const style = currentFeedOrder?.status === 'done' ? `text text_type_main-default mb-15 ${styles.textgreen}` : `text text_type_main-default mb-15 ${styles.textwhite}`




  return (
    <div className={styles.conteiner}>
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


