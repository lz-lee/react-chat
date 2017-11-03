import axios from 'axios'

// action type
const USER_LIST = 'USER_LIST'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  userList: []
}

// reducer
export function chat(state = initState, action) {
  switch (action.type) {
    case USER_LIST:
      return {
        ...state,
        userList: action.payload
      }
    case ERROR_MSG:
      return {
        ...state,
        msg: action.msg
      }
    default:
      return state
  }
}

// action creator
export function getUserList(type) {
  return dispatch => {
    axios.get('/user/list/?type=' + type).then(({data}) => {
      if (data.code === 0) {
        dispatch(userList(data.data))
      } else {
        dispatch(errorMsg(data.msg))
      }
    }).catch((err) => dispatch(errorMsg(err)))
  }
}

function userList(data) {
  return {
    type: USER_LIST,
    payload: data
  }
}

function errorMsg(msg) {
  return {
    type: ERROR_MSG,
    msg: msg
  }
}