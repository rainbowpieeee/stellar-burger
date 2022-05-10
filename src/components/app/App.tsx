import React from 'react';
import { AppHeader } from '../app-header/app-header';
import styles from './app.module.css'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients'
import { BurgerConstructor } from '../burger-constructor/burger-constructor';


const didi=[
  {
      "_id": "60666c42cc7b410027a1a9b7",
      "name": "Соус Spicy-X",
      "type": "sauce",
      "proteins": 30,
      "fat": 20,
      "carbohydrates": 40,
      "calories": 30,
      "price": 90,
      "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
      "__v": 0

  },
  {
      "_id": "60666c42cc7b410027a1a9b9",
      "name": "Соус традиционный галактический",
      "type": "sauce",
      "proteins": 42,
      "fat": 24,
      "carbohydrates": 42,
      "calories": 99,
      "price": 15,
      "image": "https://code.s3.yandex.net/react/code/sauce-03.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/sauce-03-large.png",
      "__v": 0
  },
  {
      "_id": "60666c42cc7b410027a1a9b8",
      "name": "Соус фирменный Space Sauce",
      "type": "sauce",
      "proteins": 50,
      "fat": 22,
      "carbohydrates": 11,
      "calories": 14,
      "price": 80,
      "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
      "__v": 0
  },
  {
      "_id": "60666c42cc7b410027a1a9bc",
      "name": "Плоды Фалленианского дерева",
      "type": "main",
      "proteins": 20,
      "fat": 5,
      "carbohydrates": 55,
      "calories": 77,
      "price": 874,
      "image": "https://code.s3.yandex.net/react/code/sp_1.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/sp_1-large.png",
      "__v": 0
  },
  {
      "_id": "60666c42cc7b410027a1a9bb",
      "name": "Хрустящие минеральные кольца",
      "type": "main",
      "proteins": 808,
      "fat": 689,
      "carbohydrates": 609,
      "calories": 986,
      "price": 300,
      "image": "https://code.s3.yandex.net/react/code/mineral_rings.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
      "__v": 0
  },
  {
      "_id": "60666c42cc7b410027a1a9ba",
      "name": "Соус с шипами Антарианского плоскоходца",
      "type": "sauce",
      "proteins": 101,
      "fat": 99,
      "carbohydrates": 100,
      "calories": 100,
      "price": 88,
      "image": "https://code.s3.yandex.net/react/code/sauce-01.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/sauce-01-large.png",
      "__v": 0
  }


]





function App() {
  return (
    <>
      <AppHeader />
      <main className={styles.app}>
        <section className={styles.app__constructor}>
          <BurgerIngredients />
          <BurgerConstructor staff={didi}/>

        </section>

      </main>
    </>
  )
}

export default App;
