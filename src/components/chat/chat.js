import React, {Component} from 'react'
import io from 'socket.io-client'
import {List, InputItem} from 'antd-mobile'

const URL = 'http://localhost:4500'
const socket = io(URL)

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }
  
  handleSubmit() {
    socket.emit('sendMsg', {text: this.state.text})
    this.setState({
      text: ''
    })
  }

  render() {
    return (
      <div className="chat-wrapper">
        <div className="chat-footer">
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={ v => this.setState({
                text: v
              })}
              extra={<span onClick={() => this.handleSubmit()}>发送</span>}
            ></InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat