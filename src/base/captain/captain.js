import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserList} from 'store/chat'
import UserInfo from 'base/userInfo/userInfo'

class Captain extends Component {
  componentDidMount() {
    this.props.getUserList('sailor')
  }
  
  render() {
    return (
      <UserInfo userList={this.props.userList}></UserInfo>
    )
  }
}

Captain = connect(state => state.chat, {getUserList})(Captain)
export default Captain