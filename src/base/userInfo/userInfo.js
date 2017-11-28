import React, {Component} from 'react'
import propTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import "./user-info.less"

class UserInfo extends Component {
  static propTypes = {
    userList: propTypes.array.isRequired
  }

  static defaultProps = {
    userList: []
  }

  handleClick(v) {
    this.props.history.push(`/chat/${v._id}`)
  }

  render() {
    const Header = Card.Header
    const Body = Card.Body
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {this.props.userList.map(v => 
        (v.avatar ?
          <div
            className="card-list"
            key={v._id}
            onClick={() => this.handleClick(v)}>
            <Card>
              <Header
                title={v.user}
                thumb={require(`common/image/${v.avatar}.png`)}
                extra={<div className="extra-wrapper">
                        {v.type === 'captain' ? <span>招人啦:</span> : <span>我可以胜任:</span>}
                        <span>{v.title}</span>
                      </div>}
              ></Header>
              <Body>
                {v.company ? <p className="company">公司名称: {v.company}</p> : null}
                <p className="desc">{v.type === 'captain' ? '职位要求' : '我的水平'}:</p>
                {v.desc.split('\n').map(v => (
                    <p key={v} className="desc-item">{v}</p>
                  ))}
                {v.money ? <p className="money">薪资: {v.money}</p> : null}
              </Body>
            </Card>
            <WhiteSpace></WhiteSpace>
          </div> : null
        ))}
      </WingBlank>
    )
  }
}
UserInfo = withRouter(UserInfo)
export default UserInfo