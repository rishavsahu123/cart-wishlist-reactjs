import { combineReducers } from 'redux'
import productReducer from '../redux'

export default function createReducer(asyncReducers) {
  return combineReducers({
    productReducer,
    ...asyncReducers
  });
}