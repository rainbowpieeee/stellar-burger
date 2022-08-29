import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { TIngredient } from "../../services/types/data";
import IconIngredient from "../icon-ingredient/icon-ingredient";
import style from "./order-list.module.css";

const OrderList: FC<{ list: ReadonlyArray<TIngredient> }> = ({ list }) => {
  return (
    <ul className={style.orderList}>
      {list.map((item, index) => (
        <li className={style.orderList__item} key={index}>
          <IconIngredient src={item.image_mobile} />
          <p className="pl-4 text text_type_main-default">{item.name}</p>
          <div className={style.orderList__total}>
            <p className="text text_type_digits-default">
              {item.qty ? item.qty : 1} x {item.price}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default OrderList;
