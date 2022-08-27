import { FC, useEffect, useMemo } from "react";
import style from "./feed.module.css";
import StatusList from "../../components/status-list/status-list";
import CardOrder from "../../components/card-order/card-order";
import { useDispatch, useSelector } from "../../services/hooks";
import { feedWsClose, feedWsInit } from "../../services/action/ws-feed";
import { WS_BASE_URL } from "../../services/api";
import { orderStatus } from "../../services/constant";
import { Link, useLocation } from "react-router-dom";

const FeedPage: FC = () => {
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(feedWsInit(`${WS_BASE_URL}/orders/all`));
    return () => {
      dispatch(feedWsClose());
    };
  }, [dispatch]);

  const total = useSelector((state) => state.feed.total);
  const totalToday = useSelector((state) => state.feed.totalToday);
  const orders = useSelector((state) => state.feed.orders);

  const listByDoneOrders = useMemo(() => {
    return orders
      .filter((item) => item.status === orderStatus.done)
      .slice(0, 10)
      .map((item) => item.number.toString());
  }, [orders]);

  const listByPendingOrders = useMemo(() => {
    return orders
      .filter((item) => item.status === orderStatus.pending)
      .slice(0, 10)
      .map((item) => item.number.toString());
  }, [orders]);

  return (
    <main className={style.feedPage}>
      <div className={style.feedPage__wrapper}>
        <h2 className="text text_type_main-large pt-10 pb-5">Лента заказов</h2>
        <div className={style.feedPage__content}>
          <section>
            <ul className={style.feedList}>
              {orders.map((item, index) => (
                <li className={style.feedList__item} key={index}>
                  <Link
                    key={item.number}
                    to={{
                      pathname: `/feed/${item.number}`,
                      state: { background: location },
                    }}
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <CardOrder
                      orderNameBurger={item.name}
                      orderNumber={item.number}
                      orderDateTime={item.createdAt}
                      idListIngredient={item.ingredients}
                      onlyUniqueIcon={true}
                      maxQuantityIcon={5}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section className="feedInfo">
            <div className={style.feedStatusLists}>
              <StatusList
                title="Готовы:"
                list={listByDoneOrders}
                colorTextList="#00CCCC"
              />

              <StatusList title="В работе:" list={listByPendingOrders} />
            </div>
            <div className={style.orderAllTime}>
              <p className="text text_type_main-medium">
                Выполнено за все время:
              </p>
              <p className={`text text_type_digits-large textShadow`}>
                {total}
              </p>
            </div>
            <div className={style.orderToday}>
              <p className="text text_type_main-medium">
                Выполнено за сегодня:
              </p>
              <p className={`text text_type_digits-large textShadow`}>
                {totalToday}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default FeedPage;
