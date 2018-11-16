import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import combinedReducers from './reducer/combinedReducer'
import { createEpicMiddleware } from 'redux-observable'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import { messageEpic } from './epics/messageEpics'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const epicMiddleware = createEpicMiddleware();

const store = createStore(
  combinedReducers,
  composeEnhancers(
    applyMiddleware(epicMiddleware)
  )
);

epicMiddleware.run(messageEpic)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
