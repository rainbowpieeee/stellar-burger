import { FC, useCallback, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styles from "./register.module.css";
import {
  Button,
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/hooks";
import { registerThunk } from "../../services/action/user";

const RegisterPage: FC = () => {
  const dispatch = useDispatch();
  const { request } = useSelector((state) => state.userInfo.registerInfo);
  const user = useSelector((state) => state.userInfo.user);

  const [state, setState] = useState({ email: "", name: "", password: "" });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

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
    <main className={styles.register}>
      <h2 className="text text_type_main-medium pb-6">Регистрация</h2>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(registerThunk(state));
          setState({ email: "", name: "", password: "" });
        }}
      >
        <fieldset className="fieldset">
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            value={state.name}
            name={"name"}
          />
          <EmailInput
            onChange={handleChange}
            value={state.email}
            name={"email"}
          />
          <PasswordInput
            onChange={handleChange}
            value={state.password}
            name={"password"}
          />
          <div className="button pb-20">
            <Button type="primary" size="medium">
              {!request ? "Зарегистрироваться" : "Регистрация..."}
            </Button>
          </div>
        </fieldset>
      </form>
      <ul className="registrationNav">
        <li className="registrationNav__item">
          <p className="text text_type_main-default">Уже зарегистрированы?</p>
          <Link className="link" to="/login">
            Войти
          </Link>
        </li>
      </ul>
    </main>
  );
};

export default RegisterPage;
