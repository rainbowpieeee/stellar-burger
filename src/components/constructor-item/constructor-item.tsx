import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import style from "./constructor-item.module.css";
import CSS from "csstype";
import { TIngredient, TConstructorItem } from "../../services/types/data";

const ConstructorItem: FC<TConstructorItem> = ({
  children,
  moveItem,
  index,
  id,
}) => {
  const ref = useRef(null);
  const [{ isHover }, drop] = useDrop({
    accept: "constructorItem",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item: TIngredient) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index!;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [, drag] = useDrag({
    type: "constructorItem",
    item: () => {
      return { id, index };
    },
  });
  const styleHover: CSS.Properties | null = isHover
    ? {
        outline: "3px solid #8b00ff",
        outlineOffset: "-3px",
      }
    : {};
  drag(drop(ref));
  return (
    <li ref={ref} className={style.burgerConstructorList__innerItem}>
      <DragIcon type="primary" />
      <div className={style.wrapperConstructorElement} style={styleHover}>
        {children}
      </div>
    </li>
  );
};

export default ConstructorItem;
