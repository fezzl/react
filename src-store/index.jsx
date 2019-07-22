import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/app'
import store from './redux/store'

const render = () => {
  ReactDOM.render(<App store={store}/>, document.getElementById('root'))
}
render();
store.subscribe(render);
