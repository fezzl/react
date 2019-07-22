import { createStore } from 'redux'
import { conuter } from './reducers'

const store = createStore(conuter);

export default store