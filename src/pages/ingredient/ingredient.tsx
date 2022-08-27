import { FC } from "react";
import styles from "./ingredient.module.css";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

const IngredientPage: FC = () => {
  return (
    <main className={styles.ingredient}>
      <IngredientDetails />
    </main>
  );
};

export default IngredientPage;
