
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import image from '../../images/Subtract.svg';

export function OrderRegistration(props) {
  return (
    <div className={props.styles}>
      <p className='text text_type_digits-medium mr-2'>{props.cost}</p>

      <img src={image} alt='icon' />
      <div className='ml-10'>
        <Button type="primary" size="large" onClick={props.clickHandler}>Оформить заказ</Button>
      </div>
    </div>

  )
}
