import React from "react";
import Ingredient from "../ingredient/ingredient";
import сolumnsStyle from './ingredient-type.module.css';
import { IIngredientType } from "../../utils/interfaces";
import { useSelector } from "../../services/types/hooks";




///компонент контейнер для отрисовки определенного типа ингридиентов
export const IngredientType = React.forwardRef<HTMLHeadingElement, IIngredientType>((props, ref) => {

  const { bun, elements } = useSelector(state => state.constructorState);


  return (
    <>
      <h2 ref={ref} className='text text_type_main-medium mb-6'>{props.ingredientName}</h2>
      <ul className={`pl-4 pr-4 mb-10 ${сolumnsStyle.column}`}>
        {props.data && props.data.map(item => (
          <Ingredient id={item._id} key={item._id} {...item} bun={bun} elements={elements} />
        ))
        }
      </ul>
    </>
  )
})



