import React, { FunctionComponent } from "react";

import styles from './ingredient-card.module.css'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

///компонент для карточки каждого ингрединта из заказа
export const IngredientCard: FunctionComponent<{ images: string, name: string, type: string, price: number }> = (props) => {


  return (
    <div className={styles.card} >

      <div className={styles.imageoverlay} >
        <div className={styles.imagebox} >
          <img alt={props.name} className={styles.image} src={props.images} />
        </div>
      </div>
      <p className={`text text_type_main-default  mr-25 mt-5 mb-5 ${styles.textstyle} `}>{props.name}</p>
      <div className={styles.box}>
        <p className={`text text_type_digits-default mr-2 ${styles.cost} `} >{props.type === 'bun' ? `2 x ${props.price}` : `1 x ${props.price}`}</p>
        <CurrencyIcon type="primary" />
      </div>

    </div>
  )

}

