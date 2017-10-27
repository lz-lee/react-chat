import React, {Component}from 'react'
import logoImg from './logo.png'
import './logo.css'

class Logo extends Component {
  render() {
    return (
      <div className="logo-wrapper">
        <img src={logoImg} alt=""/>
      </div>
    )
  }
}

export default Logo