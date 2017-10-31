import React, {Component} from 'react'
import {NavBar, Icon, List, InputItem, WhiteSpace, WingBlank, Button, TextareaItem} from 'antd-mobile'
import AvatarSelect from 'base/avatarSelect/avatarSelect'

class Captaininfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      company: '',
      money: '',
      desc: '',
      avatar: ''
    }
  }
  handleChange(k, v) {
    this.setState({
      [k]: v
    })
  }
  selectAvatar(avatar) {
    this.setState({
      avatar: avatar
    })
  }

  render() {
    return (
      <div className="info-wrapper">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
        >船长信息完善</NavBar>
        <WingBlank>
          <AvatarSelect selectAvatar={this.selectAvatar.bind(this)}></AvatarSelect>
          <List renderHeader={() => '详细信息'}>
            <InputItem onChange={v => this.handleChange('title', v)}
            >招聘职位：</InputItem>
            <InputItem onChange={v => this.handleChange('company', v)}
            >公司名称：</InputItem>
            <InputItem onChange={v => this.handleChange('money', v)}
            >职位薪资：</InputItem>
            <TextareaItem
              title="职位描述："
              rows={3}
              autoHeight
              onChange={v => this.handleChange('desc', v)}
            ></TextareaItem>
          </List>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handleLogin}>保存</Button>
          <WhiteSpace/>
        </WingBlank>
      </div>
    )
  }
}

export default Captaininfo
