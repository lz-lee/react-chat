import React, {Component} from 'react'
import Loadable from 'react-loadable'
import Loading from 'base/loading/loading'


  const MyComponent = Loadable({
    loader: () => import('components/login/login'),
    loading: Loading
  })

  export default class LazyLoad extends Component {
    render() {
      return <MyComponent/>
    }
  }

