import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./store/mainstore";
import { getAllProducts } from './redux/action'
import App from "./App";

const middleware = [ thunk ];
const store = createStore(reducer(), applyMiddleware(...middleware));
store.dispatch(getAllProducts());

const routes = require('./route').default(store)
render(<App store={store} route={routes} />, document.getElementById('root'))
