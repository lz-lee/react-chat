import axios from 'axios'
import {getRedirectPath} from 'common/js/util'

// action type
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LODA_DATA = 'LODA_DATA'
const LOGOUT = 'LOGOUT'

const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
}

// reducer
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        redirectTo: getRedirectPath(action.payload),
        ...action.payload
      }
    case LODA_DATA:
      return {
        ...state,
        ...action.payload
      }
    case ERROR_MSG:
      return {
        ...state,
        msg: action.msg
      }
    case LOGOUT:
      return {
        ...initState,
        redirectTo: '/login'
      }
    default:
      return state
  }
}

// action creator
export function register({user, pwd, repeatPwd, type}) {
  if (!user || !pwd || !type) {
    return errorMsg('用户名／密码必须输入')
  }
  if (pwd !== repeatPwd) {
    return errorMsg('两次输入密码不同')
  }
  // 中间件异步，需要返回函数
  return (dispatch) => axios.post('/user/register', {user, pwd, type}).then(res => {
    if (res.status === 200 && res.data.code === 0) {
      dispatch(authSuccess({user, pwd, type}))
    } else {
      dispatch(errorMsg(res.data.msg))
    }
  }).catch(err => dispatch(errorMsg(err)))
}

export function login ({user, pwd}) {
  if (!user || !pwd ) {
    return errorMsg('用户名／密码必须输入')
  }
  return (dispatch) => axios.post('/user/login', {user, pwd}).then(res => {
    if (res.status === 200 && res.data.code === 0) {
      dispatch(authSuccess(res.data.data))
    } else {
      dispatch(errorMsg(res.data.msg))
    }
  }).catch(err => dispatch(errorMsg(err)))
}

export function loadData(data) {
  return {
    type: LODA_DATA,
    payload: data
  }
}

export function update(data) {
  return dispatch => {
    axios.post('/user/update', data).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    }).catch((err) =>  dispatch(errorMsg(err)))
  }
}

export function logoutSubmit() {
  return {type: LOGOUT}
}

function errorMsg(msg) {
  return {
    type: ERROR_MSG,
    msg: msg
  }
}

function authSuccess(data) {
  return {
    type: AUTH_SUCCESS,
    payload: data
  }
}
