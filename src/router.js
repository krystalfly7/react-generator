import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
const basePath = '';
// 异步加载文件
function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null
      };
    }
    async componentDidMount() {
      const component = await importComponent();
      this.setState({ component });
    }
    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }
  return AsyncComponent;
}


const Test = asyncComponent(() => import('./test/components/App'));
const components = [
  { path: '/test', component: Test },
];


const Start = () => (
  <ul>
    {
      components.map((item) => <li  key={item.path}><Link to={basePath + item.path}>{item.path}</Link></li>)
    }
</ul>
);
ReactDom.render((
  <Router>
    <Switch>
      <Route key="/" exact path="/" component={Start}/>
      {
        components.map((item) =>
          <Route key={item.path} exact path={basePath + item.path} component={item.component}/>
        )
      }
    </Switch>
  </Router>
), document.getElementById('app'))
