import React from "react";
import { Ingredient } from "../ingredient/ingredient";
import сolumnsStyle from './ingredient-type.module.css';
import PropTypes from 'prop-types';
import { ingredientsPropTypes } from "../utils/type";

///компонент контейнер для отрисовки определенного типа ингридиентов
export const IngredientType = React.forwardRef((props, ref) => {

  return (
    <>
      <h2 ref={ref} className='text text_type_main-medium mb-6'>{props.ingredientName}</h2>
      <ul className={`pl-4 pr-4 mb-10 ${сolumnsStyle.column}`}>
        {props.data.map(item => (
          <Ingredient key={item._id} image={item.image} description={item.name} cost={item.price} name={item.name} select={props.selectItem} />
        ))
        }
      </ul>
    </>
  )
})

IngredientType.propTypes = {
  ingredientName: PropTypes.string.isRequired,
  selectItem: PropTypes.func.isRequired,
  data: ingredientsPropTypes.isRequired
}
