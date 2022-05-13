import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from './burger-ingredients.module.css';
import { IngredientType } from '../ingredient-type/ingredient-type';
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { ingredientsPropTypes } from "../utils/type";

export function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('Булки')
  const bunsRef = React.useRef();
  const soucesRef = React.useRef();
  const fillingsRef = React.useRef();

  ///вычисляем где сейчас находится скролл и подсвечиваем нужный Tabn
  function determineElementPosition(e) {
    const scrollPosition = e.target.scrollTop;
    const positionOfSouceContainer = soucesRef.current.offsetTop;
    const positionofFillingsContainer = fillingsRef.current.offsetTop;
    if (scrollPosition + 303 <= positionOfSouceContainer) {
      setCurrent('Булки');
    }
    else if (scrollPosition + 303 <= positionofFillingsContainer) {
      setCurrent('Соусы');
    } else {
      setCurrent('Начинки');
    }
  }

  return (

    <div className={ingredientsStyles.burger__tabs}>
      <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
      <ul className={`mb-10 ${ingredientsStyles.burger__nav}`}>
        <li>
          <Tab value="Булки" active={current === 'Булки'} onClick={(value) => { setCurrent(value); bunsRef.current.scrollIntoView({ behavior: "smooth", }) }} >
            Булки
          </Tab>
        </li>
        <li>
          <Tab value="Соусы" active={current === 'Соусы'} onClick={(value) => { setCurrent(value); soucesRef.current.scrollIntoView({ behavior: "smooth", }) }}>
            Соусы
          </Tab>
        </li>
        <li>
          <Tab value="Начинки" active={current === 'Начинки'} onClick={(value) => { setCurrent(value); fillingsRef.current.scrollIntoView({ behavior: "smooth", }) }}>
            Начинки
          </Tab>
        </li>
      </ul>
      <div className={ingredientsStyles.burger__ingredients} onScroll={e => { determineElementPosition(e) }}>
        <IngredientType ingredientName='Булки' data={props.buns} ref={bunsRef} selectItem={props.selectItem} />
        <IngredientType ingredientName='Соусы' data={props.souce} ref={soucesRef} selectItem={props.selectItem} />
        <IngredientType ingredientName='Начинки' data={props.filling} ref={fillingsRef} selectItem={props.selectItem} />
      </div>
      {props.isClicked && <Modal headerText={'Детали ингридиента'} modalStyles={`text text_type_main-large`} modalHeaderStyles={`${ingredientsStyles.modal__header} mt-10 mr-10 ml-10`} closeModal={props.closeModal}><IngredientDetails {...props.ingredients} /></Modal>}
    </div>
  )
}

BurgerIngredients.propTypes = {
  buns: ingredientsPropTypes.isRequired,
  souce: ingredientsPropTypes.isRequired,
  filling: ingredientsPropTypes.isRequired
}


