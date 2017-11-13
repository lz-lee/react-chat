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
                        <span>职位:</span>
                        <span>{v.title}</span>
                      </div>}
              ></Header>
              <Body>
                {v.type === 'captain' ? <div>公司: {v.company}</div> : null}
                <div>
                  <p>职位要求：</p>
                  {v.desc.split('\n').map(d => (
                    <p key={d}>{d}</p>
                  ))}
                </div>
                {v.type === 'captain' ? <div>薪资: {v.money}</div> : null}
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