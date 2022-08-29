import style from "./order-details.module.css";
import orderDone from "../../images/orderDone.svg";
import { FC } from "react";
import { TOrderDetails } from "../../services/types/data";

const OrderDetails: FC<TOrderDetails> = ({ order }) => {
  return (
    <div className={`${style.orderDetails} pt-20 pl-25 pr-25`}>
      <h2 className="text text_type_digits-large pb-8">{order}</h2>
      <p className="pb-20 text text_type_main-medium">идентификатор заказа</p>
      <img className="pb-15" src={orderDone} alt="Заказ Выполнен" />
      <p className="pb-2 text text_type_main-small">
        Ваш заказ начали готовить
      </p>
      <p className="pb-30 text text_type_main-small">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
