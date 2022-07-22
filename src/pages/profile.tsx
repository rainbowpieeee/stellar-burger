import React, { FunctionComponent } from "react";
import { FormElement } from "../components/form-element/form-element";
import styles from './profile.module.css';
import { Link, useLocation} from "react-router-dom";
import { useSelector, useDispatch } from "../services/types/hooks";
import Api from "../utils/Api";
import { getCookie, deleteCookie, setCookie } from "../utils/utils";
import { getUserData } from "../services/actions/user-data";
import { refreshMainToken } from "../utils/utils";
import { USER_LOGOUT } from "../services/constants";


export const ProfilePage: FunctionComponent = () => {

  const location = useLocation();

  const dispatch = useDispatch();



  React.useEffect(() => {
    const interval = setInterval(refreshMainToken, 100000)
    return () => {
      clearInterval(interval)
    }
  },[])


  return (
    <div className={styles.profileconteiner}>
      <div className={styles.navconteiner}>
        <nav className={`${styles.navmenu} mr-15`}>
          <ul className={styles.list}>
            <li className={styles.listelement}>
              <Link className={ location.pathname === '/profile' ? `${styles.currentlinktext} text text_type_main-medium`: `${styles.linktext} text text_type_main-medium`} to='/profile' >Профиль</Link>
            </li>
            <li className={styles.listelement}>
              <Link className={location.pathname === '/profile/orders' ? `${styles.currentlinktext} text text_type_main-medium`: `${styles.linktext} text text_type_main-medium`} to='/profile/orders'>История заказов</Link>
            </li>
            <li className={styles.listelement} onClick={() => { const match = getCookie('refreshToken'); match && Api.logoutRequest(match); deleteCookie('token'); deleteCookie('refreshToken'); dispatch({type:USER_LOGOUT}) }}>
              <Link className={`${styles.linktext} text text_type_main-medium`} to='/profile'>Выход</Link>
            </li>
          </ul>
        </nav>
        <p className={`${styles.blockquote} text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете&nbsp;  изменить свои персональные данные</p>

      </div>
      <FormElement />

    </div>

  )

}
