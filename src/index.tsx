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
import { BrowserRouter, Router,useHistory } from 'react-router-dom';



const composeEnhancers =
  typeof window === 'object' && (window && (window as any)).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window && (window as any)).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
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


