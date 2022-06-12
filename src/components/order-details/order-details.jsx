import orderDetailsStyles from './order-details.module.css';
import orderDoneImage from '../../images/done.svg';


export function OrderDetails(props) {
  return (
    <div className={`${orderDetailsStyles.order__conteiner} mt-30 mb-30`}>
      <h3 className='mb-8 text text_type_digits-large'>{props.number}</h3>
      <span className='text text_type_main-medium mb-15'>идентификатор заказа</span>
      <img src={orderDoneImage} alt='готово' />
      <p className='text text_type_main-default mt-15'>Ваш заказ начали готовить</p>
      <span className='text text_type_main-default text_color_inactive mt-2'>Дождитесь готовности на орбитальной станции</span>
    </div>

  )
}
