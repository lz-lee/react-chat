import React, {Component}from 'react'
import Logo from 'base/logo/logo'
import {List, InputItem, WhiteSpace, WingBlank, Button} from 'antd-mobile'

class Login extends Component {
  constructor(props) {
    super(props)
    // 使用bind(this)，可提升性能，内联立即执行函数写法，每次都传入的是新的一个对象
    this.register = this.register.bind(this)
  }

  register() {
    this.props.history.push('/register')
  }

  render() {
    return (
      <div className="login-wrapper">
        <Logo/>
        <WingBlank>
          <List>
            <InputItem>用户名</InputItem>
            <InputItem>密码</InputItem>
          </List>
          <WhiteSpace/>
          <Button type="primary">登录</Button>
          <WhiteSpace/>
          <Button type="primary" onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login