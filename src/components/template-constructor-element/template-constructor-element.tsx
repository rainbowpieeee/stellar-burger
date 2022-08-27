import style from "./template-constructor-element.module.css";
import { FC } from "react";
const TemplateConstructorElement: FC = () => {
  return (
    <div className={style.templateConstructorElement}>
      <div className={style.templateConstructorElement__row}>
        Перетащите сюда ингредиенты
      </div>
    </div>
  );
};

export default TemplateConstructorElement;
