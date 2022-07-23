import React, { FunctionComponent } from "react";
import styles from './order-feed.module.css';
import { OrderFeedElement } from "../order-feed-element/order-feed-element";
import { useSelector } from "../../services/types/hooks";

///компонент для ленты заказов на странице feed-page
export const OrderFeed: FunctionComponent = () => {

  const { ordersData} = useSelector(state => state.ordersFeed)

  return (

    <div className={styles.ordersconteiner}>
      <h3 className='text text_type_main-large mb-5' >Лента заказов</h3>
      <div className={styles.feed} >
        {ordersData && ordersData.orders.map((order, index) => (
          <OrderFeedElement number={order.number} key={index} order={order} styles={styles.element} path={`/feed/${order._id}`} />
        ))}
      </div>
    </div>
  )
}



