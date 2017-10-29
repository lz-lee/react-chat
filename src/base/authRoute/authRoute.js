import {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

// 非路由组件，通过withRouter 装饰，在内部获取history对象

class AuthRoute extends Component {
  componentDidMount() {
    // 现在的url地址（login则不需要跳转）
    const publicList = ['/login', '/register']
    const pathName = this.props.location.pathname
    if (publicList.indexOf(pathName) > -1) {
      return null
    }

    axios.get('/user/info').then((res) => {
      if (res.status === 200) {
        if (res.data.code === 0) {
          // 有登录信息的
        } else {
          this.history.push('/login')
        }
        console.log(res)
      }
    })
    // 是否登录
    // 用户的type （身份是船长还是水手）
    // 用户是否完善信息（选择头像，个人简介）
  }
  render() {
    return null
  }
}

AuthRoute = withRouter(AuthRoute)

export default AuthRoute