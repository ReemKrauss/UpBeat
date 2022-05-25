import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import routes from './routes.js'
import { NavBar } from './cmps/nav-bar.jsx'


class _App extends React.Component {

  render() {
    return (
      <div className="app">
        {/* <AppHeader /> */}
        <main>
          <NavBar />
          <Switch>
          {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
          </Switch>
        </main>
      </div>
    )
  }
}

function mapStateToProps(storeState) {
  return {

  }
}
const mapDispatchToProps = {

}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)
