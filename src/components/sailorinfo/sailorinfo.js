import React, {Component} from 'react'
import {NavBar, Icon} from 'antd-mobile'
import AvatarSelect from 'base/avatarSelect/avatarSelect'

class Captaininfo extends Component {
  render() {
    return (
      <div className="info-wrapper">
        <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => console.log('onLeftClick')}>水手信息完善</NavBar>
        <AvatarSelect></AvatarSelect>
      </div>
    )
  }
}

export default Captaininfo
