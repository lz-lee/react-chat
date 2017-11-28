import React, {Component} from 'react'
import propTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {TabBar} from 'antd-mobile'
import './navLink.less'

class NavLinkBar extends Component {
  static propTypes = {
    data: propTypes.array.isRequired
  }

  render() {
    const {pathname} = this.props.location
    const navList = this.props.data.filter(v => !v.hide)
    const unread = this.props.chatM.unread
    return (
      <div className="nav-link-wrapper">
        <TabBar>
          {navList.map(v => (
            <TabBar.Item
              badge={v.path === '/msg' ? unread : null}
              key={v.path}
              title={v.text}
              icon={{uri: require(`common/image/${v.icon}.png`)}}
              selectedIcon={{uri: require(`common/image/${v.icon}-active.png`)}}
              selected={v.path === pathname}
              onPress={() => this.props.history.push(v.path)}
            >

            </TabBar.Item>
          ))}
        </TabBar>
      </div>
    )
  }
}
NavLinkBar = withRouter(connect(state => state)(NavLinkBar))
export default NavLinkBar