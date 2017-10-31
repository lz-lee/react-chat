import React, {Component} from 'react'
import {List, Grid} from 'antd-mobile'

class AvatarSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const avatarList = ['圣诞老人', '雪人', 'archer', 'biker', 'bodyboard', 'bull', 'diving', 'fencing', 'fish', 'niu', 'werr', 'windsurf'].map(v => ({
      icon: require(`common/image/${v}.png`),
      text: v
    }))
    const avatarHeader = this.state.icon 
                          ? (<div>
                              <span>已选择头像</span>
                              <img style={{width: 24,verticalAlign: 'middle', marginLeft: 10}} src={this.state.icon} alt=""/>
                             </div>): '头像选择'
    return (
      <div className="avatar-wrapper">
        <List renderHeader={() => avatarHeader}>
          <Grid
            data={avatarList}
            columnNum={5}
            onClick={ele => {
              this.setState(ele)
              this.props.selectAvatar(ele.text)
            }}></Grid>
        </List>
      </div>
    )
  }
}

export default AvatarSelect
