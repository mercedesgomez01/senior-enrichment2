'use strict'
import React from 'react';
//import ReactDOM from 'react-dom';
import {render} from 'react-dom'
import { Provider } from 'react-redux'

import store from './store';
import Main from './components/Main';
// import Root from './components/Root';

render (
  <Provider store={store}>
    <Main/>
  </Provider>,
  document.getElementById('main')
)


// import React from 'react';
// import ReactDOM from 'react-dom';
// import Main from './components/Main';

// ReactDOM.render(
// 	<Main />,
// 	document.getElementById('main')
// )

