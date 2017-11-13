import React, {Component} from 'react'
import propTypes from 'prop-types'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import "./user-info.less"

class UserInfo extends Component {
  static propTypes = {
    userList: propTypes.array.isRequired
  }

  static defaultProps = {
    userList: []
  }

  render() {
    const Header = Card.Header
    const Body = Card.Body
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {this.props.userList.map(v => (
          v.avatar ? <div className="card-list" key={v._id}>
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
                <p className="desc">职位要求:</p>
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

export default UserInfo