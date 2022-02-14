import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers/reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(
    reducer, composeWithDevTools(applyMiddleware(thunk))
  )