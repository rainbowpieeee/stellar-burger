import { FunctionComponent } from 'react';
import ingredientModalStyles from './ingredient-details.module.css';
import { TIngredient } from '../../services/types/data';

export const IngredientDetails: FunctionComponent<TIngredient | {[key in any]: never}> = (props) => {

  return (
    <div className={`${ingredientModalStyles.modal__conteiner} mb-15`}>
      <img src={props.image} alt={props.name} className={`${ingredientModalStyles.modal__image} mb-4`} />
      <p className='mb-8 text text_type_main-medium'>{props.name}</p>
      <div >
        <ul className={ingredientModalStyles.modal__list}>
          <li className={`mr-5 text text_type_main-default text_color_inactive ${ingredientModalStyles.modal__listelement}`}>
            <p className={`${ingredientModalStyles.modal__text} mb-2`}>Калории, ккал</p>
            <p className={`${ingredientModalStyles.modal__text} text text_type_digits-default`}>{props.calories}</p>
          </li>
          <li className={`mr-5 text text_type_main-default text_color_inactive ${ingredientModalStyles.modal__listelement}`}>
            <p className={`${ingredientModalStyles.modal__text} mb-2`}>Белки, г</p>
            <p className={`${ingredientModalStyles.modal__text} text text_type_digits-default`}>{props.proteins}</p>
          </li>
          <li className={`mr-5 text text_type_main-default text_color_inactive ${ingredientModalStyles.modal__listelement}`}>
            <p className={`${ingredientModalStyles.modal__text} mb-2`}>Жиры, г</p>
            <p className={`${ingredientModalStyles.modal__text} text text_type_digits-default`}>{props.fat}</p></li>
          <li className={` text text_type_main-default text_color_inactive ${ingredientModalStyles.modal__listelement}`}>
            <p className={`${ingredientModalStyles.modal__text} mb-2`}>Углеводы, г</p>
            <p className={`${ingredientModalStyles.modal__text} text text_type_digits-default`}>{props.carbohydrates}</p></li>
        </ul>
      </div>
    </div>

  )
}


