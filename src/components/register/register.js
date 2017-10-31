import React, {Component}from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Logo from 'base/logo/logo'
import {List, InputItem, WhiteSpace, WingBlank, Button, Radio} from 'antd-mobile'
import {register} from 'store/user'


class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repeatPwd: '',
      type: 'captain'
    }
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleChange(key, val) {
    // 计算属性名
    this.setState({
      [key]: val
    })
  }

  handleRegister() {
    this.props.register(this.state)
    console.log(this.props)
  }

  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div className="register-wrapper">
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo/>
        <WingBlank>
          <List>
            <InputItem 
              onChange={v => this.handleChange('user', v)}
            >用户名</InputItem>
            <InputItem
              type='password'
              onChange={v => this.handleChange('pwd', v)}
            >密码</InputItem>
            <InputItem
              type='password'
              onChange={v => this.handleChange('repeatPwd', v)}
            >确认密码</InputItem>
            <WhiteSpace/>
            <RadioItem
              checked={this.state.type === 'captain'}
              onChange={() => this.handleChange('type', 'captain')}
            >船长</RadioItem>
            <RadioItem
              checked={this.state.type === 'sailor'}
              onChange={() => this.handleChange('type', 'sailor')}
            >水手</RadioItem>
          </List>
          <WhiteSpace/>
          <Button
            type="primary"
            onClick={this.handleRegister}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

Register = connect(state => state.user, {register})(Register)
export default Register