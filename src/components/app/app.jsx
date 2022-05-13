import React from 'react';
import { AppHeader } from '../app-header/app-header';
import styles from './app.module.css'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients'
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { burgerIngredientsUrl, checkResponse } from '../utils/utils';


function App() {
  const [bunsData, setBunsData] = React.useState([]);
  const [souceData, setSouceData] = React.useState([]);
  const [fillingData, setFillingData] = React.useState([]);
  const [burgerIngredientData, setBurgerData] = React.useState([]);
  const [fullBurgerData, setFullBurgerData] = React.useState([]);
  // сохранаем здесь элемент ингредиента  по которому кликнули
  const [currentSelect, setCurrentSelect] = React.useState([]);
  const [isClicked, setButtonState] = React.useState(false);
  const [isSelected, setSelect] = React.useState(false)

  // открытие попапа с информацией об ингредиенте
  function selectIngredient(e) {
    setSelect(true);
    const curentIngredientData = fullBurgerData.filter(item => {
      return item.name === e.currentTarget.id
    })
    setCurrentSelect(curentIngredientData);
  }

  function closeIngredientPopup() {
    setSelect(false)
  }

  // открытие и закрытие попапа с информацией заказа
  function openPopup() {
    setButtonState(true)
  }

  function closePopup() {
    setButtonState(false)
  }


  React.useEffect(() => {
    function getBurgerData() {
      fetch(burgerIngredientsUrl)
        .then(checkResponse)
        .then((res) => {
          setFullBurgerData(res.data);
          const filteredFromBunsIngredients = res.data.filter(item => { return item.type !== 'bun' });
          setBurgerData(filteredFromBunsIngredients);
          const newBuns = res.data.filter(element => { return element.type === 'bun'; });
          setBunsData(newBuns);
          const newSouces = res.data.filter(element => { return element.type === 'sauce'; });
          setSouceData(newSouces);
          const newFillings = res.data.filter(element => { return element.type === 'main'; });
          setFillingData(newFillings);
        })
        .catch(err => console.log(err));
    }
    getBurgerData();
  }, [])

  return (
    <>
      <AppHeader />
      <main className={styles.app}>
        <section className={styles.app__constructor}>
          <BurgerIngredients ingredients={currentSelect[0]} buns={bunsData} souce={souceData} filling={fillingData} isClicked={isSelected} selectItem={selectIngredient} closeModal={closeIngredientPopup} />
          <BurgerConstructor makeOrder={openPopup} isClicked={isClicked} staff={burgerIngredientData} closeByClick={closePopup} />
        </section>
      </main>
    </>
  )
}

export default App;
