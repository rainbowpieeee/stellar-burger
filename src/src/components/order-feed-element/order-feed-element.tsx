import React, { FunctionComponent } from "react";
import styles from './order-feed-element.module.css'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TIngredient } from "../../services/types/data";
import { useSelector, useDispatch } from "../../services/types/hooks";
import { IOrderFeedElement } from '../../utils/interfaces';
import { CLICK_ON_ORDER } from "../../services/constants";
import { formatDate } from '../../utils/utils';



///компонент с данными о заказе
export const OrderFeedElement: FunctionComponent<IOrderFeedElement> = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { ingredients } = useSelector(state => state.burgerData)

///ищем нужные ингредиенты с помощью айдишников из заказа
  const currentItems:TIngredient[] = ingredients.filter(item => {
    return props.order.ingredients.indexOf(item._id) > -1
  })

///вычисляем количество ингредиентов в заказе(6 предел по верстке из макета)
  const numberForOverlayCircle: number = currentItems.length - 6;

  const totalPrice: number= currentItems.reduce((acc, item, index) => {
     acc = item.price + acc;
    return acc
  }, 0)

  const style = props.status === 'done' ? `text text_type_main-default  ${styles.textgreen}` : `text text_type_main-default  ${styles.textwhite}`


  return (
    <Link className={styles.link} to={{ pathname: props.path, state: { background: location } }} onClick={()=> {dispatch({type:CLICK_ON_ORDER, payload:props.number})}} >
      <div className={props.styles}>
        <div className={`${styles.conteiner} mt-6 mb-6`}>
          <p className="text text_type_digits-default ">{`#${props.order.number}`}</p>
          <p className="text text_type_main-default text_color_inactive" >{formatDate(props.order.createdAt)}</p>
        </div>
        <p className={`text text_type_main-medium ${styles.name}`}>{props.order.name}</p>
        {props.status && <p className={style} >{props.status === 'done' ? 'Выполнен' : props.status === 'pending' ? 'Готовиться': props.status === 'created' ? 'Создан' : 'Выполнен' }</p>}
        <div className={`${styles.conteiner} mb-6`}>
          <div className={`${styles.imagesbox} mr-6`}>
            <div className={styles.firstimageoverlay} >
              <div className={styles.imagebox} >
                <img alt='ингредиент' className={styles.image} src={currentItems[0].image_mobile} />
              </div>
            </div>
            {currentItems[1] && <div className={styles.secondimageoverlay} >
              <div className={styles.imagebox} >
                <img alt='ингредиент' className={styles.image} src={currentItems[1].image_mobile} />
              </div>
            </div>}
            {currentItems[2] && <div className={styles.thirdimageoverlay} >
              <div className={styles.imagebox} >
                <img alt='ингредиент' className={styles.image} src={currentItems[2].image_mobile} />
              </div>
            </div>}
            {currentItems[3] && <div className={styles.fourthimageoverlay} >
              <div className={styles.imagebox} >
                <img alt='ингредиент' className={styles.image} src={currentItems[3].image_mobile} />
              </div>
            </div>}
            {currentItems[4] && <div className={styles.fifthimageoverlay} >
              <div className={styles.imagebox} >
                <img alt='ингредиент' className={styles.image} src={currentItems[4].image_mobile} />
              </div>
            </div>}
            {currentItems[5] && <div className={styles.siximageoverlay} >
              <div className={styles.imagebox} >
                <img alt='ингредиент' className={styles.image} src={currentItems[5].image_mobile} />
              </div>
            </div>}
            {currentItems.length > 6 && <div className={styles.outherimageoverlay}>
              <p className="text text_type_main-default">{`+${numberForOverlayCircle}`}</p>
            </div>}

          </div>
          <div className={styles.cost}>
            <p className="text text_type_digits-default mr-2" >{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>

        </div>
      </div>
    </Link>
  )

}


