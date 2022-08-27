import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import styles from "./app-header.module.css";

const AppHeader: FC = () => {
  const isHome = !!useRouteMatch({
    path: "/",
    exact: true,
  });
  const isProfile = !!useRouteMatch("/profile");
  const isFeed = !!useRouteMatch("/feed");

  return (
    <header className={`pt-4 pb-4 ${styles.header}`}>
      <div className={styles.headerContent}>
        <nav className={`${styles.menu}`}>
          <ul className={`${styles.menu__list}`}>
            <li className={`pr-5 ${styles.menu__item}`}>
              <NavLink
                exact
                to="/"
                className={styles.linkHeader}
                activeClassName={styles.linkHeader__active}
              >
                <BurgerIcon type={isHome ? "primary" : "secondary"} />
                <p className="pl-2 text text_type_main-default">Конструктор</p>
              </NavLink>
            </li>
            <li className={`pl-5 pr-5 ${styles.menu__item}`}>
              <NavLink
                to="/feed"
                className={styles.linkHeader}
                activeClassName={styles.linkHeader__active}
              >
                <ListIcon type={isFeed ? "primary" : "secondary"} />
                <p className="pl-2 text text_type_main-default">
                  Лента заказов
                </p>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.account}>
          <NavLink
            to="/profile"
            className={styles.linkHeader}
            activeClassName={styles.linkHeader__active}
          >
            <ProfileIcon type={isProfile ? "primary" : "secondary"} />
            <p className="pl-2 text text_type_main-default">Личный кабинет</p>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
