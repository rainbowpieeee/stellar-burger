import React, { FunctionComponent } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from './recovery.module.css';
import { useSelector, useDispatch } from "../services/types/hooks";
import { getPasswordReset } from "../services/actions/user-data";
import { Redirect } from "react-router-dom";
import { getCookie } from "../utils/utils";

export const RecoveryPage: FunctionComponent = () => {
  const { resetAnswer, resetPending, userName } = useSelector(state => state.userState);
  const token = getCookie('token')
  const dispatch = useDispatch()
  const [value, setValue] = React.useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const sendResetPasswordRequest = (value: string, event:React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    dispatch(getPasswordReset(value,token))
  }

  if (userName) {
    return (
      <Redirect to='/' />
    )
  }

  return (
    <>
      {resetAnswer && <Redirect to='/reset-password'/>}
        <div className={styles.pagestyle}>
          <form className={styles.form} onSubmit={(event) => sendResetPasswordRequest(value, event)}>
            <fieldset className={styles.inputsfield}>
              <h2 className={`text text_type_main-medium ${styles.header}`}>Восстановление пароля</h2>
              <Input type='email' value={value} onChange={onChange} placeholder={'Укажите e-mail'} />
            </fieldset>
            <Button type="primary" size="medium" >{resetPending ? 'Идет запрос...' : 'Восстановить'}</Button>
            <div className={`${styles.redirectmenu}  mt-20`}>
              <p className={`${styles.registration} text text_type_main-default text_color_inactive `}>Вспомнили пароль?</p>
              <Link className={`${styles.link} text text_type_main-default`} to='/login'>Войти</Link>
            </div>
          </form>
        </div>
      </>
  )

  }




