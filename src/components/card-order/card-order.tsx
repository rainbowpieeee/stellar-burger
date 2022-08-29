import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, memo, useMemo } from "react";
import { orderStatus } from "../../services/constant";
import { useSelector } from "../../services/hooks";
import { timeSince } from "../../services/utils";
import IconIngredient from "../icon-ingredient/icon-ingredient";
import OrderStatus from "../order-status/order-status";
import style from "./card-order.module.css";

const CardOrder: FC<{
  orderNameBurger: string;
  orderDateTime: string;
  orderNumber: number;
  orderStatus?: orderStatus;
  idListIngredient: ReadonlyArray<string>;
  maxQuantityIcon: number;
  onlyUniqueIcon: boolean;
}> = memo(
  ({
    orderNameBurger,
    orderDateTime,
    orderNumber,
    idListIngredient,
    onlyUniqueIcon,
    maxQuantityIcon,
    orderStatus,
  }) => {
    const dateTime = new Date(orderDateTime);

    const ingredients = useSelector(
      (state) => state.burgerIngredients.burgerIngredients
    );

    const ingredientsIcon = useMemo(() => {
      const listIngredients = onlyUniqueIcon
        ? Array.from(new Set([...idListIngredient]))
        : idListIngredient;
      return listIngredients.map((id) =>
        ingredients.find((item) => id === item._id)
      );
    }, [idListIngredient, onlyUniqueIcon, ingredients]);

    const totalSum = idListIngredient.reduce((accumulator, currentValue) => {
      let ingredient = ingredients.find((a) => a._id === currentValue);
      return (accumulator +=
        ingredient?.type === "bun"
          ? ingredient?.price! * 2
          : ingredient?.price!);
    }, 0);

    const listIcon = (
      <ul className={style.cardOrder__listIngredients}>
        {ingredientsIcon.slice(0, maxQuantityIcon).map((item, index) => {
          return (
            <li
              className={style.cardOrder__listIngredientItem}
              key={index}
              style={{
                zIndex: maxQuantityIcon - index,
                right: index * 16,
                position: "relative",
              }}
            >
              <IconIngredient
                src={item?.image_mobile}
                alt={item?.name}
                more={
                  index === maxQuantityIcon - 1
                    ? ingredientsIcon.length - maxQuantityIcon
                    : null
                }
              />
            </li>
          );
        })}
      </ul>
    );

    return (
      <div className={style.cardOrder}>
        <div className={style.cardOrder_wrapper}>
          <div className={style.cardOrder__info}>
            <p
              className={`text text_type_digits-default ${style.cardOrder__orderNumber}`}
            >
              #{orderNumber}
            </p>
            <p
              className={`text text_type_main-default text_color_inactive ${style.cardOrder__dateNumber}`}
            >
              {timeSince(dateTime)}
            </p>
          </div>
          <p className={`text text_type_main-medium ${style.cardOrder__name}`}>
            {orderNameBurger}
          </p>
          {orderStatus && <OrderStatus status={orderStatus} />}
          <div className={style.cardOrder__orderDetails}>
            {listIcon}
            <div className={style.cardOrder__total}>
              <p className="text text_type_digits-default pr-2">{totalSum.toString()}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default CardOrder;
