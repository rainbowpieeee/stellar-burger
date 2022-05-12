import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import itemStyles from './constructor-item.module.css';

export function ConstructorItem(props) {
    return (
        <li className={`mt-4   ${itemStyles.constructoritem__element}`}>
            <DragIcon  type='primary' />
            {props.children}
        </li>
    )
}