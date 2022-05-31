import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import routes from './routes.js'
import { NavBar } from './cmps/nav-bar.jsx'
import { AudioPlayer } from './cmps/audio-player.jsx'
import { AppHeader } from './cmps/header.jsx'
import { Hero } from './pages/hero.jsx'
import { sessionService } from './services/session.service';
import { useState } from 'react';






export const App = () => {
  const initialEntry = sessionService.load('initial')
  const [isInitial, setIsInitial] = useState(initialEntry);


  const onInitialEntry = () => {
    window.scrollTo(0, 0);
    setIsInitial(true)
    sessionService.save('initial', true)
  }

  
  return (
    <main >
      {!isInitial && <Hero onInitialEntry={onInitialEntry} />}
      <div className="app-container">
        <NavBar />
        <div className="content">
          <AppHeader />
          <Switch>
            {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
          </Switch>
        </div>
      </div>
      <AudioPlayer />
    </main>
  )
}



