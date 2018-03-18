import React, {Component}from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

class Msg extends Component {
  getLast(arr) {
    return arr[arr.length - 1]
  }

  render() {
    const Item = List.Item
    const Brief = Item.Brief
    // 当前登录的用户
    const userid = this.props.user._id
    const userList = this.props.chatM.users
    const msgGroup = {}
    this.props.chatM.chatMsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })

    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last - a_last
    })
    console.log(chatList)
    // 按照聊天用户分组，根据chatid
    return (
      <div className="msg-wrapper">
        {chatList.map(v => {
          const lastItem = this.getLast(v)
          const targetId = userid === v[0].from ? v[0].to : v[0].from
          const unreadNum = v.filter(k => !k.read && k.to === userid).length
          return(
            <List key={lastItem._id}>
              <Item
                extra={<Badge text={unreadNum}></Badge>}
                thumb={require(`common/image/${userList[targetId].avatar}.png`)}
                arrow="horizontal"
                onClick={() => {
                  this.props.history.push(`/chat/${targetId}`)
                }}
                >
                {lastItem.content}
                <Brief>{userList[targetId].name}</Brief>
              </Item>
            </List>
          )
        })}
      </div>
    )
  }
}

Msg = connect(state => state)(Msg)

export default Msg