import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import routes from './routes.js'
import { NavBar } from './cmps/nav-bar.jsx'
import { AudioPlayer } from './cmps/audio-player.jsx'
import { Header } from './cmps/header.jsx'
import { Hero } from './pages/hero.jsx'



class _App extends React.Component {

  render() {
    return (
        <main >
          {/* <Hero/> */}
          <div className="app-container">          
          <NavBar />
          <div className="content">
          <Header />
          <Switch>
            {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
          </Switch>
          </div>
          </div>
          <AudioPlayer />
        </main>
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
