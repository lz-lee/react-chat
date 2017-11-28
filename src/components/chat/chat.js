import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg} from 'store/chatM'
import {List, InputItem, NavBar, Icon} from 'antd-mobile'
import {getChatId} from 'common/js/util'
import './chat.less'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }
  
  componentDidMount () {
    if (!this.props.chatM.chatMsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }

  handleSubmit() {
    //  from 为当前登录的用户
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({
      text: ''
    })
  }

  render() {
    const userid = this.props.match.params.user
    const currentChatId = getChatId(userid, this.props.user._id)
    const chatMsg = this.props.chatM.chatMsg.filter(v => v.chatid === currentChatId)
    const Item = List.Item
    const users = this.props.chatM.users
    if (!users[userid]) {
      return null
    }
    return (
      <div className="chat-wrapper">
        <div className="chat-content">
          <NavBar mode='dark'
            icon={<Icon type='left'/>}
            onLeftClick={() => {
              this.props.history.goBack()
            }}
          >
            {users[userid].name}
          </NavBar>
          <List>
            {chatMsg.map(v => {
              const avatar = require(`common/image/${users[v.from].avatar}.png`)
              return v.from === userid ? 
              (
                <Item key={v._id}
                  thumb={avatar}
                >
                  {v.content}
                </Item>
              ) : (
                <Item key={v._id}
                  extra={<img src={avatar}/>}
                  className="chat-me"
                >{v.content}</Item>
              )
            })}
          </List>
        </div>
        <div className="chat-footer">
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={val => this.setState({
                text: val
              })}
              extra={<span onClick={() => this.handleSubmit()}>发送</span>}
            ></InputItem>
          </List>
        </div>
      </div>
    )
  }
}

Chat = connect(state => state, {getMsgList, sendMsg, recvMsg})(Chat)
export default Chat