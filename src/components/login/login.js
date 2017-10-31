import React, {Component}from 'react'
import Logo from 'base/logo/logo'
import {List, InputItem, WhiteSpace, WingBlank, Button} from 'antd-mobile'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: ''
    }
    // 使用bind(this)，可提升性能，内联立即执行函数写法，每次都传入的是新的一个对象
    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleChange(key, val) {
    // 计算属性名
    this.setState({
      [key]: val
    })
  }

  handleRegister() {
    this.props.history.push('/register')
  }
  handleLogin() {

  }
  
  render() {
    return (
      <div className="login-wrapper">
        <Logo/>
        <WingBlank>
          <List>
            <InputItem
              onChange={v => this.handleChange('user', v)}
            >用户名</InputItem>
            <InputItem
              onChange={v => this.handleChange('pwd', v)}
            >密码</InputItem>
          </List>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handleLogin}>登录</Button>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login