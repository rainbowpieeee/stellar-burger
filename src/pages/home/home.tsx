import { FC } from "react";
import { DndProvider } from "react-dnd";
import {  useSelector } from "../../services/hooks";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import ErrorText from "../../components/error-text/error-text";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./home.module.css";

const HomePage: FC = () => {
  const { burgerIngredientsFailed } = useSelector(
    (state) => state.burgerIngredients
  );

  return (
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        {burgerIngredientsFailed !== true ? (
          <>
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        ) : (
          <ErrorText text={"Что-то пошло не так"} />
        )}
      </DndProvider>
    </main>
  );
};

export default HomePage;
