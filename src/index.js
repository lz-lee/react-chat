import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import 'api/api_config'
import reducer from 'store/reducer'

import AuthRoute from 'base/authRoute/authRoute'
// import Login from 'components/login/login'
// import Register from 'components/register/register'
// import Captaininfo from 'components/captaininfo/captaininfo'
// import Sailorinfo from 'components/sailorinfo/sailorinfo'
// import Stat from 'base/stat/stat'

import LazyLoad from 'common/js/lazyLoad.js'

const Login = LazyLoad({loader: () => import('components/login/login')})
const Register = LazyLoad({loader: () => import('components/register/register')})
const Captaininfo = LazyLoad({loader: () => import('components/captaininfo/captaininfo')})
const Sailorinfo = LazyLoad({loader: () => import('components/sailorinfo/sailorinfo')})
const Stat = LazyLoad({loader: () => import('base/stat/stat')})

const store = createStore(
  reducer,
  compose(applyMiddleware(thunk), 
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="app-wrapper">
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path="/captaininfo" component={Captaininfo}></Route>
          <Route path="/sailorinfo" component={Sailorinfo}></Route>
          <Route path="/captaininfo" component={Captaininfo}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route component={Stat}></Route>
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)
