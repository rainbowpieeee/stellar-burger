import style from "./icon-ingredient.module.css";
import { FC } from "react";

const IconIngredient: FC<{
  src?: string;
  alt?: string;
  more?: number | null;
}> = ({ src, alt, more }) => {
  const opacity = more ? { opacity: "0.6" } : {};
  return (
    <div
      style={{
        // position: "relative",
        // zIndex: index,
        // right: 20 * index!,
        // borderRadius: "50%",
      }}
    >
      <img
        className={style.IconIngredient__img}
        src={src}
        alt={alt}
        style={opacity}
      />
      {more && (
        <p
          className={`${style.IconIngredient__text} text text_type_main-default`}
        >
          +{more}
        </p>
      )}
    </div>
  );
};

export default IconIngredient;
