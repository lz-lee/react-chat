import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import 'api/api_config'
import reducer from 'store/reducer'

import AuthRoute from 'base/authRoute/authRoute'
import Login from 'components/login/login'
import Register from 'components/register/register'


const store = createStore(
  reducer,
  compose(applyMiddleware(thunk)), 
  window.devToolsExtension ? window.devToolsExtension() : f => f
)
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="app-wrapper">
        <AuthRoute></AuthRoute>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)
