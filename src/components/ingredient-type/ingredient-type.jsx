import React from "react";

import { Ingredient } from "../ingredient/ingredient";
import ColumnsStyle from './ingredient-type.module.css';







export const IngredientType = React.forwardRef((props, ref) => {
    return (
        <>
            <h2 ref={ref} className='text text_type_main-medium mb-6'>{props.ingredientName}</h2>
            <ul className={`pl-4 pr-4 mb-10 ${ColumnsStyle.column}`}>
                {props.data.map(item => (
                    <Ingredient key={item._id} image={item.image} description={item.name} cost={item.price} name={item.name} value={props.number} />
                ))
                }

            </ul>
        </>
    )
})

