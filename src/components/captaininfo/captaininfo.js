import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from 'store/user'
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
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div className="info-wrapper">
        {redirect && redirect !== path ? <Redirect to={redirect}/> : null}
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
          <Button type="primary" onClick={() => this.props.update(this.state)}>保存</Button>
          <WhiteSpace/>
        </WingBlank>
      </div>
    )
  }
}

Captaininfo = connect(state => state.user, {update})(Captaininfo)
export default Captaininfo
