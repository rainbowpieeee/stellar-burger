import React, { FunctionComponent } from "react";
import cardStyles from './ingredient.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredient } from "../../utils/interfaces";
import { useDispatch, useSelector } from '../../services/types/hooks';
import { CLICK_ON_INGREDIENT } from "../../services/constants/index";
import { useDrag } from "react-dnd";
import { Link, useLocation, useHistory } from "react-router-dom";

const Ingredient: FunctionComponent<IIngredient> = (props) => {
  const { id, elements, bun } = props
  const { ingredients } = useSelector(state => state.burgerData)


  const dispatch = useDispatch();
  const location = useLocation();

  const [, dragRef] = useDrag({
    type: 'item',
    item: { id }
  })
  ////находим ингредиент который выбрали
  function selectIngredient(evt: React.MouseEvent, data: typeof ingredients) {
    return data.filter(item => {
      return item._id === evt.currentTarget.id
    })

  }

  return (
    <Link className={cardStyles.link} to={{
      pathname: `/ingredients/${props.id}`,
      state: { background: location }
    }} >
      <li ref={dragRef} id={props.id} className={cardStyles.ingredient__item} onClick={(evt) => { dispatch({ type: CLICK_ON_INGREDIENT, item: selectIngredient(evt, ingredients) }) }}   >
        {!!props.amount && !!elements.length && <Counter count={props.amount} size="default" />}
        {!!bun.amount && props.type === 'bun' && bun._id === id && !!bun && <Counter count={bun.amount} size="default" />}
        <img className={`mb-1 pl-4 pr-4  ${cardStyles.ingredient__image}`} src={props.image} alt={props.name} />
        <div className={`mb-1 ${cardStyles.ingredient__info}`} >
          <p className='mr-1 text text_type_digits-default'>{props.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`mt-1 text text_type_main-default ${cardStyles.ingredient__text}`}>{props.name}</p>
      </li>
    </Link>
  )
}



export default React.memo(Ingredient)
