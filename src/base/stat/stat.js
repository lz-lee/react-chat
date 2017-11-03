import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Switch, Route} from 'react-router-dom'
import {NavBar} from 'antd-mobile'

import LazyLoad from 'common/js/lazyLoad.js'
import './stat.css'

const NavLinkBar = LazyLoad({loader: () => import('../navLinkBar/navLinkBar')})
const Captain = LazyLoad({loader: () => import('base/captain/captain')})
const Sailor = LazyLoad({loader: () => import('base/sailor/sailor')})

class Stat extends Component {

  render() {
    const {pathname} = this.props.location
    const {type} = this.props
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
        // component: Msg
      },
      {
        path: '/userCenter',
        text: '我',
        icon: 'user-center',
        title: '个人中心',
        // component: UserCenter
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

Stat = connect(state => state.user)(Stat)

export default Stat