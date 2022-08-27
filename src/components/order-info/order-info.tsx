import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useLocation, useParams, useRouteMatch } from "react-router-dom";
import { orderStatus } from "../../services/constant";
import { useSelector } from "../../services/hooks";
import { timeSince } from "../../services/utils";
import OrderList from "../order-list/order-list";
import OrderStatus from "../order-status/order-status";
import style from "./order-info.module.css";

const OrderInfo = () => {
  const location = useLocation<{
    background?: Location;
  }>();
  const isFeed = useRouteMatch({
    path: `/:feed/:number`,
    exact: true,
  });

  const { number } = useParams<{ number: string }>();

  const myOrders = useSelector((state) => state.myOrders.orders);
  const allOrders = useSelector((state) => state.feed.orders);
  const ingredients = useSelector(
    (state) => state.burgerIngredients.burgerIngredients
  );

  const searchOrder = (
    listOrder: ReadonlyArray<{
      ingredients: ReadonlyArray<string>;
      id: string;
      status: orderStatus;
      number: number;
      createdAt: string;
      updateAt: string;
      name: string;
    }>,
    number: number
  ) => {
    return listOrder.find((item) => item.number === number);
  };

  const order = !!isFeed
    ? searchOrder(allOrders, parseInt(number))
    : searchOrder(myOrders, parseInt(number));

  const dateTime = new Date(order?.createdAt!);

  const totalSum = order?.ingredients.reduce((accumulator, currentValue) => {
    let ingredient = ingredients.find((a) => a._id === currentValue);
    return (accumulator +=
      ingredient?.type === "bun" ? ingredient?.price! * 2 : ingredient?.price!);
  }, 0);

  const ingredientsCurrentOrder = useMemo(() => {
    return order?.ingredients.map((id) =>
      ingredients.find((item) => id === item._id)
    );
  }, [order, ingredients]);

  // Подсчитываем количество ингредиентов
  const ingredientsListWithCount = new Map();
  ingredientsCurrentOrder?.forEach(function (el) {
    if (!el) return;
    if (ingredientsListWithCount.has(el["_id"])) {
      ingredientsListWithCount.get(el["_id"]).qty++;
    } else {
      if (el.type === "bun") {
        ingredientsListWithCount.set(el["_id"], Object.assign(el, { qty: 2 }));
      } else {
        ingredientsListWithCount.set(el["_id"], Object.assign(el, { qty: 1 }));
      }
    }
  });

  if (order) {
    return (
      <div style={{ maxWidth: 640 }}>
        <div className={style.orderInfo__header}>
          {!location?.state?.background && (
            <p className="mb-10 text text_type_digits-default">
              #{order?.number}
            </p>
          )}
          <p className="mb-3 text text_type_main-medium">{order?.name}</p>
        </div>
        <div className={style.orderInfo__main}>
          <OrderStatus status={order.status} />
          <p className="mb-6 text text_type_main-medium">Состав:</p>
          <OrderList list={Array.from(ingredientsListWithCount.values())} />
        </div>
        <div className={style.orderInfo__footer}>
          <p className="text text_type_main-default text_color_inactive">
            {timeSince(dateTime)}
          </p>
          <div className={style.orderInfo__total}>
            <p className="mr-2 text text_type_digits-default">{totalSum}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    );
  }
  return <p>Загрузка...</p>;
};

export default OrderInfo;
