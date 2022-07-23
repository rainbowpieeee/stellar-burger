import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/index';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { socketMiddleware } from './services/middleware/socketMiddleware';
import { WS_AUTH_CONNECTION_ERROR, WS_AUTH_CONNECTION_SUCCESS, WS_AUTH_CONNECTION_GET_MESSAGE, WS_AUTH_CONNECTION_START,  WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_GET_MESSAGE,  WS_CLOSE_CONNECTION } from './services/constants'

const wsFeedActions = {
  wsStart: WS_CONNECTION_START ,
  wsSuccess: WS_CONNECTION_SUCCESS,
  wsError: WS_CONNECTION_ERROR,
  wsMessage: WS_GET_MESSAGE ,
  wsClose: WS_CLOSE_CONNECTION
}

const wsPersonalFeedActions = {
  wsStart: WS_AUTH_CONNECTION_START ,
  wsSuccess: WS_AUTH_CONNECTION_SUCCESS,
  wsError: WS_AUTH_CONNECTION_ERROR,
  wsMessage: WS_AUTH_CONNECTION_GET_MESSAGE,
  wsClose:  WS_CLOSE_CONNECTION
}


const composeEnhancers =
  typeof window === 'object' && (window && (window as any)).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window && (window as any)).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware('wss://norma.nomoreparties.space/orders',wsFeedActions),socketMiddleware('wss://norma.nomoreparties.space/orders',wsPersonalFeedActions, true) ));


export const state = createStore(rootReducer, enhancer);

ReactDOM.render(

  <React.StrictMode>
    <Provider store={state}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


