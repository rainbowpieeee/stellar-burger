import React, { FunctionComponent } from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './form-element.module.css';
import { useDispatch, useSelector } from "../../services/types/hooks";
import { getUserData, refreshUser } from "../../services/actions/user-data";
import { deleteCookie } from "../../utils/utils";
import { CHANGE_EMAIL, CHANGE_PASSWORD, CHANGE_NAME, USER_DATA_SUCCESS } from "../../services/constants";
import { getCookie } from "../../utils/utils";

export const FormElement: FunctionComponent = () => {
  const { formName, formEmail, formPassword, userName, userEmail} = useSelector(state => state.userState)
  console.log(formName, formEmail, formPassword)
  console.log(userName, userEmail)
  const dispatch = useDispatch()

  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const loginInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);
  const onNameClick = () => {
    setTimeout(() => nameInputRef.current && nameInputRef.current.focus(), 0)
  }
  const onLoginClick = () => {
    setTimeout(() => loginInputRef.current && loginInputRef.current.focus(), 0)
  }
  const onPasswordClick = () => {
    setTimeout(() => passwordInputRef.current && passwordInputRef.current.focus(), 0)
  }




  return (
    <div className={styles.formelement}>
      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); dispatch(refreshUser(formEmail, formPassword, formName,getCookie('token'))) }}>
        <fieldset className={styles.fieldset}>
          <Input onIconClick={onNameClick} ref={nameInputRef} type={'text'} placeholder={'Имя'} onChange={(e) => dispatch({ type: CHANGE_NAME, name: e.target.value })} icon={'EditIcon'} value={formName} />
          <Input onIconClick={onLoginClick} ref={loginInputRef} type={'text'} placeholder={'Логин'} onChange={e => dispatch({ type: CHANGE_EMAIL, email: e.target.value })} icon={'EditIcon'} value={formEmail} />
          <Input onIconClick={onPasswordClick} ref={passwordInputRef} type={'password'} placeholder={'Пароль'} onChange={e => dispatch({ type: CHANGE_PASSWORD, password: e.target.value })} icon={'EditIcon'} value={formPassword} />
        </fieldset>
        <div className={styles.buttonconteiner}>
        <Button  type="primary" size="medium" >Сохранить</Button>
        <Button onClick={() => dispatch({type: USER_DATA_SUCCESS, email: userEmail, name:userName})} type="primary" size="medium" >Отмена</Button>
        </div>
      </form>
    </div>
  )
}

