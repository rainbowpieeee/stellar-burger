import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { useState, useMemo, useEffect, FC, useCallback } from "react";
import ConstructorList from "../constructor-list/constructor-list";
import { useDispatch, useSelector } from "../../services/hooks";
import { sendOrderThunk } from "../../services/action/order-details";
import { setDefaultValueIngredients } from "../../services/action/burger-constructor";
import { resetQtyIngredients } from "../../services/action/burger-ingredients";
import ErrorText from "../error-text/error-text";
import { useHistory } from "react-router-dom";

const initialStateButton = {
  text: "Оформить заказ",
  count: 3,
};

const BurgerConstructor: FC = () => {
  const { ingredients } = useSelector((state) => state.burgerConstructor);
  const { user } = useSelector((state) => state.userInfo);
  const history = useHistory();
  const { orderRequest } = useSelector((state) => state.orderInfo);
  const { success } = useSelector((state) => state.orderInfo);
  const [textButton, seTextButton] = useState(initialStateButton);

  const [show, setShow] = useState(false);
  const total = useMemo(() => {
    return ingredients.reduce((accumulator, element) => {
      return element.type !== "bun"
        ? (accumulator += element.price)
        : (accumulator += element.price * 2);
    }, 0);
  }, [ingredients]);

  const dispatch = useDispatch();

  const idIngredientList = useSelector((state) => {
    const listIngredients = state.burgerConstructor.ingredients;
    const idList = listIngredients.map((item) => {
      return item._id;
    });

    return idList;
  });

  const orderNumber = useSelector((state) => state.orderInfo.order.number);
  const orderFailed = useSelector((state) => state.orderInfo.orderFailed);

  const handlerOrder = useCallback(() => {
    if (!user) {
      history.push({
        pathname: "/login",
      });
      return;
    }
    setShow(true);
    dispatch(sendOrderThunk(idIngredientList));
  }, [dispatch, history, idIngredientList, user]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (orderRequest) {
      seTextButton({
        text: "Ждите",
        count: initialStateButton.count,
      });
      interval = setInterval(() => {
        seTextButton((prevState) => ({
          count:
            prevState.count === 0
              ? initialStateButton.count
              : prevState.count - 1,
          text: prevState.count === 0 ? "Ждите" : prevState.text + ".",
        }));
      }, 1000);
    } else {
      seTextButton(initialStateButton);
    }
    return () => {
      clearInterval(interval);
    };
  }, [orderRequest]);

  return (
    <section className={`${style.burgerConstructor} pl-4 pr-4`}>
      <ConstructorList ingredientList={ingredients} />
      {orderFailed ? <ErrorText text={"Ошибка при оформлении заказа"} /> : null}
      <div className={style.burgerConstructor__total}>
        <p className="text text_type_digits-medium pr-2">{total}</p>
        <CurrencyIcon type="primary" />
        <div className={`${style.buttonOrder} pl-10`}>
          <Button
            disabled={!total || orderRequest}
            onClick={handlerOrder}
            type="primary"
            size="large"
          >
            {textButton.text}
          </Button>
        </div>
      </div>
      {success && show && (
        <Modal
          onClose={() => {
            setShow(false);
            dispatch(setDefaultValueIngredients());
            dispatch(resetQtyIngredients());
          }}
        >
          <OrderDetails order={orderNumber} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
