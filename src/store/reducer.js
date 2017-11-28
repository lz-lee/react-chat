import {combineReducers} from 'redux'
import {user} from './user'
import {chat} from './chat'
import {chatM} from './chatM'

export default combineReducers({user, chat, chatM})