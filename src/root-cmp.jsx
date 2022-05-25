import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import routes from './routes.js'
import { NavBar } from './cmps/nav-bar.jsx'
import { AudioPlayer } from './cmps/audio-player.jsx'


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
          <AudioPlayer />
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
