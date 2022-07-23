import React from "react";
import { ProfileNav } from "../components/profile-nav/profile-nav";
import styles from './profile-orders.module.css';
import { OrderFeedElement } from "../components/order-feed-element/order-feed-element";
import { useDispatch, useSelector } from "../services/types/hooks";
import { WS_AUTH_CONNECTION_START, WS_CLOSE_CONNECTION } from "../services/constants";


import Api from "../utils/Api";
import { setCookie, getCookie } from "../utils/utils";


export function ProfileOrdersPage() {
  const dispatch = useDispatch();
  const refresh = getCookie('refreshToken');
  const { order } = useSelector(state => state.userFeed)
  console.log(order)


  React.useEffect(() => {

     dispatch({ type: WS_AUTH_CONNECTION_START })

    return () => {
      dispatch({ type: WS_CLOSE_CONNECTION })
    }
  }, [])

  const reversedArray = order && [...order.orders].reverse()

  return (
    <div className={styles.conteiner} >
      <ProfileNav navconteiner={styles.navconteiner} text='В этом разделе вы можете&nbsp;  просмотреть свою историю заказов' />
      <div className={styles.feed}  >
        {reversedArray && reversedArray.map((item, index) => (
          <OrderFeedElement number={item.number} key={index} order={item} styles={styles.element} status={item.status} path={`/profile/orders/${item._id}`} />)
        )}
      </div>
    </div>
  )
}
