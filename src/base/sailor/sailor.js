import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserList} from 'store/chat'
import UserInfo from 'base/userInfo/userInfo'

class Sailor extends Component {
  componentDidMount() {
    this.props.getUserList('captain')
  }
  
  render() {
    return (
      <UserInfo userList={this.props.userList}></UserInfo>
    )
  }
}

Sailor = connect(state => state.chat, {getUserList})(Sailor)
export default Sailor