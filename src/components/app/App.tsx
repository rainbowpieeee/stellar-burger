import React from 'react';
import { AppHeader } from '../app-header/app-header';
import styles from './app.module.css'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients'
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import data from '../utils/data';

function App() {
  return (
    <>
      <AppHeader />
      <main className={styles.app}>
        <section className={styles.app__constructor}>
          <BurgerIngredients />
          <BurgerConstructor staff={data}/>

        </section>

      </main>
    </>
  )
}

export default App;
