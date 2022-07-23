import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "../services/types/hooks";
import style from './burger-page.module.css'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerConstructor } from "../components/burger-constructor/burger-constructor";
import { BurgerIngredients } from "../components/burger-ingredients/burger-ingredients";
import {  getCookie } from "../utils/utils";



export const Constructor: FunctionComponent = () => {


  return (

    <section className={`${style.constructor}`}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </section>

  )
}
