import { createStore ,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { conuter } from './reducers'

const store = createStore(conuter,composeWithDevTools(applyMiddleware(thunk)));

export default store