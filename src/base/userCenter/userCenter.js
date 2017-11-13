import React, {Component}from 'react'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {Result, List, WhiteSpace, Modal, WingBlank, Button} from 'antd-mobile'
import {logoutSubmit} from 'store/user'
import {Redirect} from 'react-router-dom'

class UserCenter extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout() {
    const alert = Modal.alert
    alert('注销', '确认退出登录？', [
      {text: '取消', onPress: () => console.log('cancel')},
      {text: '确定', onPress: () => {
          Cookies.remove('userid')
          this.props.logoutSubmit()
        }
      }
    ])
  }

  render() {
    const {avatar, user, type, company, title, money, desc, redirectTo} = this.props
    const Item = List.Item
    const Brief = Item.Brief
    return (
      user ? <div className="user-center">
        <Result
          img={<img src={require(`common/image/${avatar}.png`)} alt="" style={{width:60}}/>}
          title={user}
          message={type === 'captain' ? company : null}
        >
        </Result>
        <WingBlank>
          <List renderHeader={() => '简介'}>
            <Item multipleLine>
              {type === 'captain' ? <span>招人啦:{title}</span> : <span>我可以胜任:{title}</span>}
              {desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
              {money ? <Brief>薪资:{money}</Brief> : null}
            </Item>
          </List>
          <WhiteSpace></WhiteSpace>
          <Button onClick={this.logout}>退出登录</Button>
        </WingBlank>
      </div> : <Redirect to={redirectTo}></Redirect>
    )
  }
}

UserCenter = connect(state => state.user, {logoutSubmit})(UserCenter)
export default UserCenter