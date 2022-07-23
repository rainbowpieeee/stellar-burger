import React, { FunctionComponent } from 'react';
import { AppHeader } from '../app-header/app-header';
import styles from './app.module.css'
import { Switch, Route, useLocation, useHistory, Router } from 'react-router-dom';
import { useDispatch } from '../../services/types/hooks';
import { getBurgerData } from '../../services/actions/burger-ingredients';
import { Constructor } from '../../pages/burger-constructor-page';
import { LoginPage } from '../../pages/login-page';
import { RegistrationPage } from '../../pages/registration';
import { RecoveryPage } from '../../pages/recovery';
import { ResetPage } from '../../pages/reset';
import { ProfilePage } from '../../pages/profile';
import { Preloader } from '../preloader/preloader';
import { useSelector } from '../../services/types/hooks';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getUserData } from '../../services/actions/user-data';
import { deleteCookie, getCookie,setCookie } from '../../utils/utils';
import { IngredientPage } from '../../pages/ingredient-page';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { CLICK_ON_CLOSE_BUTTON } from '../../services/constants';
import { refreshMainToken } from '../../utils/utils';
import { FeedPage } from '../../pages/feed-page';
import { OrderStuff } from '../order-stuff/order-stuff';
import { OrderStuffPage } from '../../pages/order-stuff-page';
import { ProfileOrdersPage } from '../../pages/profile-orders';



const App: FunctionComponent = () => {
  const history = useHistory()
  const location = useLocation<{ [key in any]: any }>();
  const isPush = history.action === 'PUSH';

  const background = isPush && location.state && location.state.background;

  const dispatch = useDispatch();

  const { dataRequest } = useSelector(store => store.burgerData)
  const { userName } = useSelector(store => store.userState)
  const { currentItem } = useSelector(state => state.currentSelect)
  const { orderNumber } = useSelector(store => store.ordersFeed)

  const refresh = getCookie('refreshToken')
  const token = getCookie('token')



  React.useEffect(() => {
    dispatch(getBurgerData());
    token !== undefined && dispatch(getUserData(token, refresh, refreshMainToken))
  }, [dispatch])


  return (
    dataRequest ?
      (<Preloader />)
      :
      (<>
        <AppHeader />

        <main className={styles.app}>
          <Switch location={background || location} >
            <Route path='/' exact={true}>
              <Constructor />
            </Route>
            <Route path='/login' exact={true}>
              <LoginPage />
            </Route>
            <Route path='/register' exact={true}>
              <RegistrationPage />
            </Route>
            <Route path='/forgot-password' exact={true}>
              <RecoveryPage />
            </Route>
            <Route path='/reset-password' exact={true}>
              <ResetPage />
            </Route>
            <ProtectedRoute path='/profile/orders/:id' redirectPath='/login' check={userName}>
              <OrderStuffPage />
            </ProtectedRoute >
            <ProtectedRoute path='/profile/orders' redirectPath='/login' check={userName}>
              <ProfileOrdersPage />
            </ProtectedRoute >
            <ProtectedRoute path='/profile' redirectPath='/login' check={userName} >
              <ProfilePage />
            </ProtectedRoute>
            <Route path='/ingredients/:id' exact={true} >
              <IngredientPage />
            </Route>
            <Route path='/feed' exact={true}>
              <FeedPage />
            </Route>
            <Route path='/feed/:id' exact={true}>
              <OrderStuffPage />
            </Route>
            <Route  >
              <div>
                <h1>Empty Page</h1>
              </div>
            </Route>
          </Switch>


          {background &&
            <>
              <Route path='/feed/:id' >
                <Modal headerText={`#${orderNumber}`} modalStyles={`text text_type_digits-default`} modalHeaderStyles={`${styles.modal__header} mt-10 mr-10 ml-10`} closeModal={() => { history.goBack(); dispatch({ type: CLICK_ON_CLOSE_BUTTON }) }}>  <OrderStuff /></Modal>
              </Route>
              <ProtectedRoute redirectPath='/login' check={userName} path='/profile/orders/:id' >
                <Modal headerText={`#${orderNumber}`} modalStyles={`text text_type_digits-default`} modalHeaderStyles={`${styles.modal__header} mt-10 mr-10 ml-10`} closeModal={() => { history.goBack(); dispatch({ type: CLICK_ON_CLOSE_BUTTON }) }}>  <OrderStuff /></Modal>
              </ProtectedRoute>
            </>}
          {background && <Route path='/ingredients/:id' >
            <Modal headerText={'Детали ингридиента'} modalStyles={`text text_type_main-large`} modalHeaderStyles={`${styles.modal__header} mt-10 mr-10 ml-10`} closeModal={() => { history.goBack(); dispatch({ type: CLICK_ON_CLOSE_BUTTON }) }}><IngredientDetails {...currentItem} /></Modal>
          </Route>}
        </main>

      </>)
  )
}

export default App;

