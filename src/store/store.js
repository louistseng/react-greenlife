import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
const thunk = require('redux-thunk').default;
const { composeWithDevTools } = require('redux-devtools-extension');

const middleware = [thunk];
const store = createStore(reducers, applyMiddleware(...middleware))

export default store