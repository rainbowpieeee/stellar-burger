import { FC, useEffect } from "react";
import OrderInfo from "../../components/order-info/order-info";
import { feedWsClose, feedWsInit } from "../../services/action/ws-feed";
import {
  myOrdersWsClose,
  myOrdersWsInit,
} from "../../services/action/ws-my-orders";
import { WS_BASE_URL } from "../../services/api";
import { ACCESS_TOKEN } from "../../services/constant";
import { useDispatch, useSelector } from "../../services/hooks";
import { getCookie } from "../../services/utils";
import styles from "./order-info.module.css";

const OrderInfoPage: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo.user);
  useEffect(() => {
    dispatch(feedWsInit(`${WS_BASE_URL}/orders/all`));
    if (user) {
      dispatch(
        myOrdersWsInit(`${WS_BASE_URL}/orders?token=${getCookie(ACCESS_TOKEN)}`)
      );
    }
    return () => {
      dispatch(feedWsClose());
      if (user) {
        dispatch(myOrdersWsClose());
      }
    };
  }, [dispatch]);

  return (
    <main className={styles.orderInfo}>
      <OrderInfo />
    </main>
  );
};

export default OrderInfoPage;
