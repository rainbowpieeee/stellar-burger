import React, { FunctionComponent } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './profile-nav.module.css';
import { getCookie, deleteCookie} from "../../utils/utils";
import { useDispatch } from "../../services/types/hooks";
import Api from "../../utils/Api";
import { USER_LOGOUT } from "../../services/constants";



///компонент меню навигации в личном кабинете
export const ProfileNav:FunctionComponent<{text:string, navconteiner: string}> = (props) => {

  const location = useLocation();

  const dispatch = useDispatch();

  return (
    <div className={props.navconteiner}>
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
      <p className={`${styles.blockquote} text text_type_main-default text_color_inactive mt-20`}>{props.text}</p>

      </div>
  )

}
