import Api from "../../components/utils/Api";

export const OPEN_ORDER_POPUP = 'OPEN_ORDER_POPUP';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';
export const CLOSE_ORDER_POPUP = 'CLOSE_ORDER_POPUP';


export function getOrderNumber(idData) {
    return function(dispatch) {
        dispatch({ type: GET_ORDER_REQUEST })
        Api.getOrderNumber(idData)
            .then(res => {

                dispatch({ type: GET_ORDER_SUCCESS, data: res.order.number, orderData: res, result: res.success })
            })
            .catch(err => { dispatch({ type: GET_ORDER_ERROR }) })

    }
}