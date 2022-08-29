import styles from "./error-text.module.css";
import {FC} from 'react'
import { TErrorText } from "../../services/types/data";

const ErrorText:FC<TErrorText> =  ({ text }) =>{
  return (
    <div className={styles.errorText}>
      <p className="text text_type_digits-medium">{text}</p>
    </div>
  );
}

export default ErrorText;
