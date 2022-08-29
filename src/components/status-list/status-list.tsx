import { FC } from "react";
import style from "./status-list.module.css";

const StatusList: FC<{
  title: string;
  list: Array<string>;
  colorTextList?: string;
}> = ({ title, list, colorTextList }) => {
  const colorListStyle = colorTextList
    ? {
        color: colorTextList,
      }
    : {};
    
  return (
    <div>
      <p className="text text_type_main-medium mb-6">{title}</p>
      <ul className={`text text_type_digits-default ${style.statusList}`}>
        {list.map((element, index) => (
          <li style={colorListStyle} className={`${style.statusList__item}`} key={index}>
            {element}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatusList;
