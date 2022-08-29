import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { FC, useCallback, useMemo, memo } from "react";
import style from "./constructor-list.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorItem from "../constructor-item/constructor-item";
import {
  addIngredientToConstructor,
  addBunToConstructor,
  deleteItemById,
  reorderIngredients,
} from "../../services/action/burger-constructor";
import {
  decrementQtyIngredients,
  incrementQtyBun,
  incrementQtyIngredient,
} from "../../services/action/burger-ingredients";
import TemplateConstructorElement from "../template-constructor-element/template-constructor-element";
import { TIngredientWithUniqKey } from "../../services/types/data";
import { useDispatch } from "../../services/hooks";

const POSTIX_NAME_BUN_TOP = "(верх)";
const POSTIX_NAME_BUN_BUTTOM = "(низ)";

const ConstructorList: FC<{
  ingredientList: Array<TIngredientWithUniqKey>;
}> = memo(({ ingredientList }) => {
  const itemsWithoutBun = useMemo(
    () => ingredientList.filter((item) => item.type !== "bun"),
    [ingredientList]
  );

  const [itemBun] = useMemo(
    () => ingredientList.filter((item) => item.type === "bun"),
    [ingredientList]
  );

  const dispatch = useDispatch();
  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop(item: TIngredientWithUniqKey) {
      if (item.type === "bun") {
        dispatch(addBunToConstructor({ ...item, uuid: uuidv4() }));
        dispatch(incrementQtyBun(item));
      } else {
        dispatch(addIngredientToConstructor({ ...item, uuid: uuidv4() }));
        dispatch(incrementQtyIngredient(item));
      }
    },
  });

  const removeItem = useCallback(
    (item: TIngredientWithUniqKey) => {
      dispatch(deleteItemById(item.uuid));
      dispatch(decrementQtyIngredients(item));
    },
    [dispatch]
  );

  const moveItem = useCallback(
    (dragIndex, hoverIndex) => {
      let elements = ingredientList;
      // В стейсте у нас всегда первый элемент массива булка
      // Если  булка добавлена, то мы должны сделать инкремент индексов
      // Т.к. у нас единый массив хранения индегриентов,
      // И если в массиве будет bun, и мы будем перетаскивать индегриенд
      // То в стейте будет меняться булка и первый индегриент, вместо того, что бы поменять два индегриента между собой
      // Либо использовать такой костыль, или хранить булки отдельно
      if (ingredientList[0].type === "bun") {
        dragIndex += 1;
        hoverIndex += 1;
      }
      const dragElement = ingredientList[dragIndex];
      elements.splice(dragIndex, 1);
      elements.splice(hoverIndex, 0, dragElement);
      dispatch(reorderIngredients(elements));
    },
    [ingredientList, dispatch]
  );
  return (
    <ul className={`pt-25 ${style.burgerconstructorList}`} ref={dropRef}>
      {ingredientList.length === 0 ? (
        <li className={style.burgerconstructorList__item}>
          <TemplateConstructorElement />
        </li>
      ) : null}

      {itemBun && (
        <li className={style.burgerconstructorList__item}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${itemBun.name} ${POSTIX_NAME_BUN_TOP}`}
            price={itemBun.price}
            thumbnail={itemBun.image}
          />
        </li>
      )}

      <ul
        className={`${style.burgerconstructorList__inner} ${
          ingredientList.length === 0
            ? style.burgerconstructorListOverflowHidden__inner
            : ""
        }`}
      >
        {itemsWithoutBun.map((item, index) => (
          <ConstructorItem
            key={item.uuid}
            index={index}
            moveItem={moveItem}
            id={item.uuid}
          >
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              handleClose={() => {
                removeItem(item);
              }}
            />
          </ConstructorItem>
        ))}
      </ul>
      {itemBun && (
        <li className={style.burgerconstructorList__item}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${itemBun.name} ${POSTIX_NAME_BUN_BUTTOM}`}
            price={itemBun.price}
            thumbnail={itemBun.image}
          />
        </li>
      )}
    </ul>
  );
});

export default ConstructorList;
