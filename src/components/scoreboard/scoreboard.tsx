import React, { FunctionComponent } from "react";
import styles from './scoreboard.module.css';
import { useSelector } from "../../services/types/hooks";
import { TFeedOrder } from "../../services/types/data";



export const ScoreBoard: FunctionComponent = () => {

  const { ordersData } = useSelector(state => state.ordersFeed)


  const doneOrders: TFeedOrder[] | null = ordersData && ordersData.orders.filter(item => {
    return item.status === 'done'
  })

  const ordersInProcess: TFeedOrder[] | null = ordersData && ordersData.orders.filter(item => {
    return item.status === 'pending'
  })


  return (
    <div className={styles.conteiner}>

      <div className={styles.statusbox} >

        <div className={styles.box}>
          <p className="text text_type_main-medium mb-6" >Готовы:</p>
          <div className={styles.ulbox}>
            {doneOrders?.map((item, index) => (
              <p key={index} className={`text text_type_main-default ${styles.statusdone}`}>{item.number}</p>
            ))}
          </div>
        </div>
        <div className={styles.box} >
          <p className="text text_type_main-medium mb-6"  >В работе:</p>
          <div className={styles.ulbox}>
            {ordersInProcess?.slice(0, 9).map((item, index) => (
              <p key={index} className='text text_type_digits-default'>{item.number}</p>
            ))}
          </div>
        </div>
      </div>
      <div>
        <p className="text text_type_main-medium" >Выполнено за все время:</p>
        <p className={`text text_type_digits-large ${styles.digits} `} >{ordersData?.total}</p>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`text text_type_digits-large ${styles.digits} `} >{ordersData?.totalToday}</p>
      </div>
    </div>

  )




}
