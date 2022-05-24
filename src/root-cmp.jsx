import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { loadToys } from './store/actions/toy.action'
import { AppHeader } from './cmps/app-header'
import { ToyUpdate } from './pages/toy-update'
import { ToyApp } from './pages/toy-app'
import { ToyDetails } from './pages/toy-details'
import { Dashboard } from './pages/dashboard'
import { About } from './pages/about'
import { Login } from './pages/login'
import { SignUp } from './pages/sign-up'

class _App extends React.Component {
  componentDidMount() {
    this.props.loadToys()
  }

  render() {
    return (
      <div className="app">
        <AppHeader />
        <main>
          <Switch>
            <Route path="/toys/update/:toyId">
              <ToyUpdate />
            </Route>
            <Route path="/toys/update">
              <ToyUpdate />
            </Route>
            <Route path="/toys/:toyId">
              <ToyDetails />
            </Route>
            <Route path="/toys">
              <ToyApp />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
          </Switch>
        </main>
      </div>
    )
  }
}

function mapStateToProps(storeState) {
  return {
    toys: storeState.toyModule.toys,
  }
}
const mapDispatchToProps = {
  loadToys,
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)
