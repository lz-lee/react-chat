import axios from 'axios'
import io from 'socket.io-client'
const URL = 'http://localhost:4500'
const socket = io(URL)

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'

const initState = {
  chatMsg: [],
  unread: 0,
  users: {}
}

// reducer
export function chatM(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        chatMsg: action.payload.data,
        users: action.payload.users,
        unread: action.payload.data.filter(v => !v.read && v.to === action.payload.currentUserId).length
      }
    case MSG_RECV:
      const n = action.currentUserId === action.payload.to ? 1 : 0
      return {
        ...state,
        chatMsg: [...state.chatMsg, action.payload], unread: state.unread + n
      }
    case MSG_READ:
    default:
      return state
  }
}

// action creator
function msg_list(data, users, currentUserId) {
  return {
    type: 'MSG_LIST',
    payload: {
      data: data,
      users: users,
      currentUserId: currentUserId
    }
  }
}
function msg_recv(data, currentUserId) {
  return {
    type: MSG_RECV,
    payload: data,
    currentUserId
  }
}
// function msg_read(data) {
//   return {
//     type: MSG_READ,
//     payload: data
//   }
// }

// action
export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/user/getMsgList').then(({data}) => {
      if (data.code === 0) {
        // 当前登录的user
        const currentUserId = getState().user._id
        dispatch(msg_list(data.data, data.users, currentUserId))
      }
    })
  }
}

export function sendMsg({from, to, msg}) {
  return dispatch => {
    socket.emit('sendMsg', {from, to, msg})
  }
}

export function recvMsg() {
  return (dispatch, getState) => {
    socket.on('recvmsg', function(data) {
      // 当前登录的user
      const currentUserId = getState().user._id
      dispatch(msg_recv(data, currentUserId))
    })
  }
}