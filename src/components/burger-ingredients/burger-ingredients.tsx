import React, { FunctionComponent } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from './burger-ingredients.module.css';
import { IngredientType } from '../ingredient-type/ingredient-type';
import { useSelector, useDispatch } from '../../services/types/hooks';
import { useHistory, Route } from "react-router-dom";




export const BurgerIngredients: FunctionComponent = () => {

  const { ingredients } = useSelector(state => state.burgerData);


  const [current, setCurrent] = React.useState('Булки')
  const bunsRef = React.useRef<HTMLDivElement>(null);
  const soucesRef = React.useRef<HTMLDivElement>(null);
  const fillingsRef = React.useRef<HTMLDivElement>(null);

  ///вычисляем где сейчас находится скролл и подсвечиваем нужный Tab
  function determineElementPosition(e: React.ChangeEvent<HTMLDivElement>) {
    const scrollPosition = e.target.scrollTop;
    const positionOfSouceContainer = soucesRef.current !== null && soucesRef.current.offsetTop;
    const positionofFillingsContainer = fillingsRef.current !== null && fillingsRef.current.offsetTop;
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
          <Tab value="Булки" active={current === 'Булки'} onClick={(value) => { setCurrent(value); bunsRef.current !== null && bunsRef.current.scrollIntoView({ behavior: "smooth", }) }} >
            Булки
          </Tab>
        </li>
        <li>
          <Tab value="Соусы" active={current === 'Соусы'} onClick={(value) => { setCurrent(value); soucesRef.current !== null && soucesRef.current.scrollIntoView({ behavior: "smooth", }) }}>
            Соусы
          </Tab>
        </li>
        <li>
          <Tab value="Начинки" active={current === 'Начинки'} onClick={(value) => { setCurrent(value); fillingsRef.current !== null && fillingsRef.current.scrollIntoView({ behavior: "smooth", }) }}>
            Начинки
          </Tab>
        </li>
      </ul>
      <div className={ingredientsStyles.burger__ingredients} onScroll={(e: any) => { determineElementPosition(e) }}>
        <IngredientType ingredientName='Булки' data={ingredients.filter(item => item.type === 'bun')} ref={bunsRef} />
        <IngredientType ingredientName='Соусы' data={ingredients.filter(item => item.type === 'sauce')} ref={soucesRef} />
        <IngredientType ingredientName='Начинки' data={ingredients.filter(item => item.type === 'main')} ref={fillingsRef} />
      </div>

    </div>
  )
}



