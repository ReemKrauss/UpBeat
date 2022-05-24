import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'



class _App extends React.Component {

  render() {
    return (
      <div className="app">
        {/* <AppHeader /> */}
        <main>
          <Switch>
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
