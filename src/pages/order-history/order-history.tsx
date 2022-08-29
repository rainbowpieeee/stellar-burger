import { FC, useEffect } from "react";
import SidebarMenu from "../../components/sidebar-menu/sidebar-menu";
import CardOrder from "../../components/card-order/card-order";
import styles from "./order-history.module.css";
import { WS_BASE_URL } from "../../services/api";
import { useDispatch, useSelector } from "../../services/hooks";
import {
  myOrdersWsClose,
  myOrdersWsInit,
} from "../../services/action/ws-my-orders";
import { ACCESS_TOKEN } from "../../services/constant";
import { getCookie } from "../../services/utils";
import { Link, useLocation } from "react-router-dom";
import { v4 } from "uuid";

const OrderHistoryPage: FC = () => {
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      myOrdersWsInit(`${WS_BASE_URL}/orders?token=${getCookie(ACCESS_TOKEN)}`)
    );
    return () => {
      dispatch(myOrdersWsClose());
    };
  }, [dispatch]);

  const orders = useSelector((state) => state.myOrders.orders);

  return (
    <main className={styles.orderHistory}>
      <div className={styles.orderHistory__container}>
        <div className={styles.orderHistory__wrapper}>
          <div className="sidebarLeft">
            <div className="sidebarLeft__wrapper pb-20">
              <SidebarMenu />
            </div>
            <p className="text text_type_main-default text_color_inactive aboutPage">
              В этом разделе вы можете просмотреть свою историю заказов
            </p>
          </div>
          <section>
            <ul className={styles.orderHistoryList}>
              {orders
                .slice()
                .reverse()
                .map((item) => (
                  <li className={styles.orderHistoryList__item} key={v4()}>
                    <Link
                      key={item.number}
                      to={{
                        pathname: `/profile/orders/${item.number}`,
                        state: { background: location },
                      }}
                      style={{ textDecoration: "none", color: "#fff" }}
                    >
                      <CardOrder
                        orderNameBurger={item.name}
                        orderNumber={item.number}
                        orderDateTime={item.createdAt}
                        orderStatus={item.status}
                        idListIngredient={item.ingredients}
                        onlyUniqueIcon={true}
                        maxQuantityIcon={5}
                      />
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
};

export default OrderHistoryPage;
