import React, {Component}from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {List, InputItem, WhiteSpace, WingBlank, Button} from 'antd-mobile'
import Logo from 'base/logo/logo'
import {login} from 'store/user'

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
    this.props.login(this.state)
  }
  
  render() {
    return (
      <div className="login-wrapper">
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

Login = connect(state => state.user, {login})(Login)
export default Login
