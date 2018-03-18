import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Switch, Route} from 'react-router-dom'
import {getMsgList, recvMsg} from 'store/chatM'
import {NavBar} from 'antd-mobile'

import LazyLoad from 'common/js/lazyLoad.js'
import './stat.less'

const NavLinkBar = LazyLoad({loader: () => import('../navLinkBar/navLinkBar')})
const Captain = LazyLoad({loader: () => import('base/captain/captain')})
const Sailor = LazyLoad({loader: () => import('base/sailor/sailor')})
const UserCenter = LazyLoad({loader: () => import('base/userCenter/userCenter')})
const Msg = LazyLoad({loader: () => import('base/msg/msg')})


class Stat extends Component {

  componentDidMount () {
    if (!this.props.chatM.chatMsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }

  render() {
    const {pathname} = this.props.location
    const {type} = this.props.user
    const navList = [
      {
        path: '/captain',
        text: '水手',
        icon: 'sailor',
        title: '水手列表',
        component: Captain,
        hide: type === 'sailor'
      },
      {
        path: '/sailor',
        text: '船长',
        icon: 'captain',
        title: '船长列表',
        component: Sailor,
        hide: type === 'captain'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',  
        title: '消息列表',
        component: Msg
      },
      {
        path: '/userCenter',
        text: '我',
        icon: 'user-center',
        title: '个人中心',
        component: UserCenter
      },
    ]
    return (
      <div className="dashboard-wrapper">
        <NavBar className="fixed-header" mode="dark">{navList.find(v => v.path === pathname).title}</NavBar>
        <div className="content">
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

Stat = connect(state => state, {getMsgList, recvMsg})(Stat)

export default Stat