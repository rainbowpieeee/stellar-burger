import React, { FunctionComponent } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import styles from './reset.module.css';
import { useDispatch, useSelector } from "../services/types/hooks";
import { setNewPassword } from "../services/actions/user-data";
import { getCookie } from "../utils/utils";

export const ResetPage: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { isPasswordChanged, resetAnswer, userName } = useSelector(store => store.userState)
  const [passwordInputValue, setPasswordInputValue] = React.useState('');
  const [tokenInputValue, setTokenInputValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInputValue(e.target.value)
  }

  const onTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenInputValue(e.target.value)
  }
  const [visible, setVisible] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onIconClick = () => {
    setVisible(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };
  const validateField = (value: string) => {
    setError(value.length < 6);
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value) {
      validateField(e.target.value);
    } else {
      setError(false);
    }
    setVisible(false);
  };

  const resetUserPassword = (evt: React.FormEvent<HTMLFormElement>, password: string, token: string) => {
    evt.preventDefault();
    dispatch(setNewPassword(password, token))
  }

  if (!resetAnswer) {
    return (
      <Redirect to='/login' />
    )
  }

  if (userName) {
    return (
      <Redirect to='/' />
    )
  }

  return (
    <div className={styles.pagestyle}>
      <form className={styles.form} onSubmit={evt => resetUserPassword(evt, passwordInputValue, tokenInputValue)}>
        <fieldset className={styles.inputsfield}>
          <h2 className={`text text_type_main-medium ${styles.header}`}>Восстановление пароля</h2>
          <Input errorText={'Некорректный пароль'} error={error} ref={inputRef} icon={visible ? 'HideIcon' : 'ShowIcon'} type={visible ? 'text' : 'password'} onChange={onPasswordChange} onBlur={onBlur} onIconClick={onIconClick} value={passwordInputValue} name={'password'} placeholder='Введите новый пароль' />
          <Input onChange={onTokenChange} value={tokenInputValue} name={'password'} placeholder='Введите код из письма' />
        </fieldset>
        <Button type="primary" size="medium" >{isPasswordChanged ? 'Пароль изменен' : 'Сохранить'}</Button>
        <div className={`${styles.redirectmenu}  mt-20`}>
          <p className={`${styles.password} text text_type_main-default text_color_inactive `}>Вспомнили пароль?</p>
          <Link className={`${styles.link} text text_type_main-default`} to='/login'>Войти</Link>
        </div>
      </form>

    </div>
  )
}
