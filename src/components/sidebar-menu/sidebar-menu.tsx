import { NavLink, useHistory } from "react-router-dom";
import styles from "./sidebar-menu.module.css";
import { FC, useCallback } from "react";
import { getCookie } from "../../services/utils";
import { REFRESH_TOKEN } from "../../services/constant";
import { useDispatch } from "../../services/hooks";
import { logoutThunk } from "../../services/action/user";

const setStyleActiveLink = (isActive: boolean) => {
  return !isActive ? styles.link : styles.link__active + " " + styles.link;
};

const SidebarMenu: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onClickLogoutLink = useCallback(
    async (e) => {
      e.preventDefault();
      dispatch(
        logoutThunk(getCookie(REFRESH_TOKEN), () => {
          history.replace({ pathname: "/login" });
        })
      );
    },
    [dispatch, history]
  );

  return (
    <ul className={`${styles.sidebarMenu}`}>
      <li className={styles.sidebarMenu__item}>
        <NavLink exact className={setStyleActiveLink} to="/profile">
          Профиль
        </NavLink>
      </li>
      <li className={styles.sidebarMenu__item}>
        <NavLink exact className={setStyleActiveLink} to="/profile/orders">
          История заказов
        </NavLink>
      </li>
      <li className={styles.sidebarMenu__item}>
        <NavLink
          exact
          className={setStyleActiveLink}
          to="/logout"
          onClick={onClickLogoutLink}
        >
          Выход
        </NavLink>
      </li>
    </ul>
  );
};

export default SidebarMenu;
