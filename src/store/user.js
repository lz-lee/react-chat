import axios from 'axios'
import {getRedirectPath} from 'common/util'

// action type
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  redirectTo: '',
  isAuth: false,
  msg: '',
  user: '',
  pwd: '',
  type: ''
}

// reducer
export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        redirectTo: getRedirectPath(action.payload),
        ...action.payload
      }
    case ERROR_MSG:
      return {
        ...state,
        isAuth: false,
        msg: action.msg
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
  return dispatch => {
    axios.post('/user/register', {user, pwd, type}).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(registerSuccess({user, pwd, type}))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

function errorMsg(msg) {
  return {
    type: ERROR_MSG,
    msg: msg
  }
}

function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  }
}