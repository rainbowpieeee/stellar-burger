import React, { FunctionComponent } from "react";
import { PasswordInput, EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { getCookie } from "../utils/utils";
import styles from './login-page.module.css';
import { loginUser } from "../services/actions/user-data";
import { useDispatch, useSelector } from "../services/types/hooks";
import { Redirect, Link, useLocation } from "react-router-dom";
import { ILocation } from "../utils/interfaces";

export const LoginPage: FunctionComponent = () => {
  const location = useLocation<{[key in any] : any}>()


  const dispatch = useDispatch();
  const { userName } = useSelector(state => state.userState)
  const [emailInputValue, setEmailValue] = React.useState('');
  const [passwordInputValue, setPasswordValue] = React.useState('')

  const token = getCookie('token')


  const onEmailInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value)
  }
  const onPasswordInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value)
  }




 if (userName) {
    return (
      <Redirect to={ location.state?.from || '/'} />
    )
  }



  return (
    <>

      <div className={styles.pagestyle}>
        <form className={styles.form} onSubmit={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); dispatch(loginUser(emailInputValue, passwordInputValue, token)) }}>
          <fieldset className={styles.inputsfield}>
            <h2 className={`text text_type_main-medium ${styles.header}`}>Вход</h2>
            <EmailInput onChange={onEmailInputValueChange} value={emailInputValue} name={'email'} />
            <PasswordInput onChange={onPasswordInputValue} value={passwordInputValue} name={'password'} />
          </fieldset>
          <Button type="primary" size="medium" >Войти</Button>
          <div className={`${styles.redirectmenu} mb-4 mt-20`}>
            <p className={`${styles.registration} text text_type_main-default text_color_inactive `}>Вы — новый пользователь?</p>
            <Link className={`${styles.link} text text_type_main-default`} to='/register'>Зарегистрироваться</Link>
          </div>
          <div className={styles.redirectmenu}>
            <p className={`${styles.password} text text_type_main-default text_color_inactive `}>Забыли пароль?</p>
            <Link className={`${styles.link} text text_type_main-default`} to='/forgot-password'>Восстановить пароль</Link>
          </div>
        </form>
      </div>
    </>
  )
}
