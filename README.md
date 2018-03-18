# react-chat
## react实时聊天系统

### 1、antd-mobile按需加载css

  * npm i  babel-plugin-import -S

  * 配置babel

    ```
    // .babelrc or babel-loader option
      {
        "plugins": [
          ["import", { libraryName: "antd-mobile", style: "css" }] 
        ]
      }
    ```

### 2、使用装饰器优化connect

* npm run eject

* npm i babel-plugin-transform-decorators-legacy -D

* package.json里babel加上plugins配置

  ```
  {
    "plugins": [
      "transform-decorators-legacy"
    ]
  }
  ```

### 3、react-router4

* web端是用react-router-dom

* 入门组件

    * BrowserRouter，包裹整个应用

    * Route 路由对应渲染的组件，可嵌套

      * 一般接受两个参数，path以及component来指定路由对应的url以及要渲染的组件

      * exact属性：完全精准匹配。

    * Link/NavLink 跳转专用

        * NavLink： 当前激活的导航设置不同的样式，激活导航属性：activeStyle

    * match： Route组件默认会为其component组件提供match作为props参数，包含以下属性：

      * params 预设在url中传递冒号标识的参数

      * isExact 当前url是否绝对匹配此路由

      * path 路由设定的path值

      * url 当前的url

    * Redirect组件 跳转

    * Switch 只渲染命中的第一个子Route组件

    * Route 不写path时，最后命中的总是该路由对应的组件，可用于404页面

### 4、 多个reducer，使用combineReducers合并

  ```
  import {combineReducers} from 'redux'

  export default combineReducers({reducer1, reducer2})
  ```

### 5、高阶组件

  * 属性代理

    * 代码复用
    
    * 抽象逻辑

    ```
    function WrapperComponent(OldComponent) {
      class newComponent extends React.Component {
        render() {
          return <OldComponent {...this.props}></OldComponent>
        }
      }
    }
    ```

  * 反向继承

    * 渲染劫持、修改生命周期

    ```
     function WrapperComponent(OldComponent) {
       class newComponent extends OldComponent {

         componentDidMount() {
           // doing something
         }

         render() {
           return <OldComponent></OldComponent>
         }
       }
       return newComponent
     }
    ```

### 6、性能优化

  * 组件性能优化

    * 传递更少的参数，减少传递数据的负担，使用同一份数据，而不是重新定义一份

    * 减少组件渲染次数

    * 绑定函数优化：在html结构里使用箭头函数和bind方式，在render过程中都会重新创建一个新函数。而在构造函数中绑定this，只会创建一次。

    * 如果组件没有内部状态，只是根据props渲染：定制shouldComponentUpdate 或者 使用PureComponent

      ```
        ...

        shouldComponentUpdate(nextProps, nextState) {
          // 比较this.props 与 nextProps 是否相等
          return true // 默认
        }
        ...
      ```
    * immutable.js
  * redux 性能优化

    * 使用reselect.js对计算过程做缓存


  * 动画解决方案

    * ReactCSSTransitionGroup

    * Ant Motion

  * react同构

    * 首屏采用服务端渲染的dom结构

    * ssr：

      * build后node使用babel-node配置node里的react环境

      * 修改客户端代码，抽离app组件，前后端共享

      * 服务端生成DOM结构，渲染，加载build后的css 和 js