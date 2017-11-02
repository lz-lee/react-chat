import React, {Component} from 'react'
import propTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import {TabBar} from 'antd-mobile'
import './navLink.css'

class NavLinkBar extends Component {
  static propTypes = {
    data: propTypes.array.isRequired
  }

  render() {
    const {pathname} = this.props.location
    const navList = this.props.data.filter(v => !v.hide)
    return (
      <div className="nav-link-wrapper">
        <TabBar>
          {navList.map(v => (
            <TabBar.Item
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
NavLinkBar = withRouter(NavLinkBar)
export default NavLinkBar