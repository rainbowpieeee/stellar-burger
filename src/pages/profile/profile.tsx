import { FC, useCallback, useEffect, useRef, useState } from "react";
import styles from "./profile.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import SidebarMenu from "../../components/sidebar-menu/sidebar-menu";
import { useDispatch, useSelector } from "../../services/hooks";
import { updateProfileThunk } from "../../services/action/user";

const ProfilePage: FC = () => {
  const dispatch = useDispatch();
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPassRef = useRef<HTMLInputElement>(null);
  const inputNameRef = useRef<HTMLInputElement>(null);

  const emailValue = useSelector((store) => store.userInfo.user?.email) || "";
  const nameValue = useSelector((store) => store.userInfo.user?.name) || "";

  const [state, setState] = useState({
    email: {
      value: emailValue,
      disabled: true,
    },
    name: {
      value: nameValue,
      disabled: true,
    },
    password: {
      value: "",
      disabled: true,
    },
  });

  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    setState({
      email: {
        value: emailValue,
        disabled: true,
      },
      name: {
        value: nameValue,
        disabled: true,
      },
      password: {
        value: "",
        disabled: true,
      },
    });
  }, [emailValue, nameValue]);

  const isFormChanged =
    emailValue !== state.email.value ||
    nameValue !== state.name.value ||
    !!state.password.value;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name as keyof typeof state;
    setState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value,
      },
    }));
  }, []);

  const handleIconClick = useCallback((nameInput: keyof typeof state) => {
    setState((prevState) => ({
      ...prevState,
      [nameInput]: {
        ...prevState[nameInput],
        disabled: !prevState[nameInput].disabled,
      },
    }));
  }, []);

  const onBlur = useCallback((nameInput: keyof typeof state) => {
    setState((prevState) => ({
      ...prevState,
      [nameInput]: {
        ...prevState[nameInput],
        disabled: true,
      },
    }));
  }, []);

  useEffect(() => {
    if (!state.name.disabled) inputNameRef.current?.focus();
    if (!state.email.disabled) inputEmailRef.current?.focus();
    if (!state.password.disabled) inputPassRef.current?.focus();
  }, [state]);

  const handleUpdateProfile = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        updateProfileThunk({
          email: stateRef.current.email.value,
          password: stateRef.current.password.value,
          name: stateRef.current.name.value,
        })
      );
    },
    [dispatch]
  );

  const handleCancelChange = useCallback(
    (e) => {
      e.preventDefault();
      setState({
        email: {
          value: emailValue,
          disabled: true,
        },
        name: {
          value: nameValue,
          disabled: true,
        },
        password: {
          value: "",
          disabled: true,
        },
      });
    },
    [emailValue, nameValue]
  );

  return (
    <main className={styles.profile}>
      <div className={styles.profile__container}>
        <div className={styles.profile__wrapper}>
          <div className="sidebarLeft">
            <div className="sidebarLeft__wrapper pb-20">
              <SidebarMenu />
            </div>
            <p className="text text_type_main-default text_color_inactive aboutPage">
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>

          <form className={`${styles.form} ${styles.profileForm}`} onSubmit={handleUpdateProfile}>
            <fieldset className="fieldset">
              <Input
                type="text"
                name="name"
                value={state.name.value}
                onChange={handleChange}
                placeholder={"Имя"}
                icon={"EditIcon"}
                disabled={state.name.disabled}
                onIconClick={() => {
                  handleIconClick("name");
                }}
                ref={inputNameRef}
                onBlur={() => {
                  onBlur("name");
                }}
              />
              <Input
                type="text"
                name="email"
                value={state.email.value}
                onChange={handleChange}
                placeholder={"Логин"}
                icon={"EditIcon"}
                disabled={state.email.disabled}
                onIconClick={() => {
                  handleIconClick("email");
                }}
                ref={inputEmailRef}
                onBlur={() => {
                  onBlur("email");
                }}
              />
              <Input
                type="password"
                name="password"
                value={state.password.value}
                onChange={handleChange}
                placeholder={"Пароль"}
                icon={"EditIcon"}
                disabled={state.password.disabled}
                onIconClick={() => {
                  handleIconClick("password");
                }}
                ref={inputPassRef}
                onBlur={() => {
                  onBlur("password");
                }}
              />
              {isFormChanged && (
                <div className="button button__group">
                  <Button
                    type="primary"
                    size="medium"
                    htmlType="reset"
                    onClick={handleCancelChange}
                  >
                    Отменить
                  </Button>
                  <Button type="primary" size="medium" htmlType="submit">
                    Сохранить
                  </Button>
                </div>
              )}
            </fieldset>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
