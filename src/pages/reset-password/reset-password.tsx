import { FC, useCallback, useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import styles from "./reset-password.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { confirmResetPassThunk } from "../../services/action/user";
import { useSelector } from "../../services/hooks";
import { Location } from "history";

const ResetPasswordPage: FC = () => {
  const user = useSelector((store) => store.userInfo.user);
  const dispatch = useDispatch();
  const location = useLocation<{
    from: Location;
  }>();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const [state, setState] = useState({
    password: "",
    token: "",
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  if (!location.state?.from) {
    return <Redirect to="/forgot-password" />;
  }

  if (user) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  return (
    <main className={styles.resetPassword}>
      <h2 className="text text_type_main-medium pb-6">Восстановление пароля</h2>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            confirmResetPassThunk(state, () => {
              history.replace({ pathname: "/login" });
            })
          );
        }}
      >
        <fieldset className="fieldset">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder={"Введите новый пароль"}
            icon={"ShowIcon"}
            onIconClick={() => {
              setShowPassword((preValue) => !preValue);
            }}
          />
          <Input
            type={"text"}
            name="token"
            value={state.token}
            onChange={handleChange}
            placeholder={"Введите код из письма"}
          />
          <div className="button pb-20">
            <Button type="primary" size="medium" htmlType="submit">
              Сохранить
            </Button>
          </div>
        </fieldset>
      </form>
      <ul className="registrationNav">
        <li className="registrationNav__item">
          <p className="text text_type_main-default">Вспомнили пароль?</p>
          <Link className="link" to="/login">
            Войти
          </Link>
        </li>
      </ul>
    </main>
  );
};

export default ResetPasswordPage;
