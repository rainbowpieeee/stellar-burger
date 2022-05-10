import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from './app-header.module.css';
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { MenuItem } from "../menu-item/menu-item";

export function AppHeader() {
  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.header__navigation}>
        <ul className={headerStyles.header__list}>
          <MenuItem text='Конструктор' textStyles={'text text_type_main-default ml-2'} styles={`${headerStyles.header__item} pl-5 pr-5`}>
            <BurgerIcon type='primary' />
          </MenuItem>
          <MenuItem text='Лента заказов' textStyles={'text text_type_main-default text_color_inactive ml-2'} styles={`${headerStyles.header__item} pl-5 pr-5`}>
            <ListIcon type='secondary' />
          </MenuItem>
          <MenuItem styles={headerStyles.header__logo}>
            <Logo />
          </MenuItem>
          <MenuItem text='Личный кабинет' textStyles={'text text_type_main-default text_color_inactive ml-2'} styles={`${headerStyles.header__item} pl-5 pr-5`}>
            <ProfileIcon type='secondary' />
          </MenuItem>
        </ul>
      </nav>
    </header>

  )
}