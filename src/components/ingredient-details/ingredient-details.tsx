import style from "./ingredient-details.module.css";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "../../services/hooks";

const IngredientDetails: FC = () => {
  const {id} = useParams<{id :string}>();
  const ingredientInfo = useSelector((state) => {
    return state.burgerIngredients.burgerIngredients.find((element) => {
      return element._id === id;
    });
  });

  return (
    <div className={style.ingredientDetails}>
      <img
        className="pb-6"
        src={ingredientInfo?.image_large}
        alt={ingredientInfo?.name}
      />
      <p className="text text_type_main-medium pb-8">{ingredientInfo?.name}</p>
      <ul className={style.ingredientDetails__nutritionalValue}>
        <li className={style.ingredientDetails__nutritionaValueItem}>
          <p
            className={`text text_type_main-default ${style.ingredientDetails__nutritionaName}`}
          >
            Калории,ккал
          </p>
          <p
            className={`${style.ingredientDetails__nutritionaCount} text text_type_digits-default `}
          >
            {ingredientInfo?.calories}
          </p>
        </li>
        <li className={style.ingredientDetails__nutritionaValueItem}>
          <p
            className={`text text_type_main-default ${style.ingredientDetails__nutritionaName}`}
          >
            Белки, г
          </p>
          <p
            className={`${style.ingredientDetails__nutritionaCount} text text_type_digits-default `}
          >
            {ingredientInfo?.proteins}
          </p>
        </li>
        <li className={style.ingredientDetails__nutritionaValueItem}>
          <p
            className={`text text_type_main-default ${style.ingredientDetails__nutritionaName}`}
          >
            Жиры, г
          </p>
          <p
            className={`${style.ingredientDetails__nutritionaCount} text text_type_digits-default `}
          >
            {ingredientInfo?.fat}
          </p>
        </li>
        <li className={style.ingredientDetails__nutritionaValueItem}>
          <p
            className={`text text_type_main-default ${style.ingredientDetails__nutritionaName}`}
          >
            Углеводы, г
          </p>
          <p
            className={`${style.ingredientDetails__nutritionaCount} text text_type_digits-default `}
          >
            {ingredientInfo?.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
