import React from 'react'
import { useState } from 'react';
import { Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from './routes.js'
import { NavBar } from './cmps/nav-bar.jsx'
import { AudioPlayer } from './cmps/audio-player.jsx'
import { AppHeader } from './cmps/header.jsx'
import { Hero } from './pages/hero.jsx'
import { sessionService } from './services/session.service';
import { HeaderBGProvider } from './context/useBackgroundColor'
import { UserMsg } from './cmps/user-msg.jsx';




export const App = () => {
  const initialEntry = sessionService.load('initial')
  const [isInitial, setIsInitial] = useState(initialEntry);
  const [opacity, setOpacity] = useState(0)
  const { userMsg } = useSelector((storeState) => storeState.userModule)

  const onInitialEntry = () => {
    window.scrollTo(0, 0);
    setIsInitial(true)
    sessionService.save('initial', true)
  }


  const onScroll = (e) => {
    let currScroll = e.currentTarget.scrollTop
    if (currScroll > 200 && opacity === 1) return
    else if (currScroll > 200) setOpacity(1)
    else if (currScroll > 180) setOpacity(0.9)
    else if (currScroll > 160) setOpacity(0.8)
    else if (currScroll > 140) setOpacity(0.7)
    else if (currScroll > 120) setOpacity(0.6)
    else if (currScroll > 100) setOpacity(0.5)
    else if (currScroll > 80) setOpacity(0.4)
    else if (currScroll > 60) setOpacity(0.3)
    else if (currScroll > 40) setOpacity(0.2)
    else if (currScroll > 20) setOpacity(0.1)
    else setOpacity(0) 
  }




  return (
    <main >
      {!isInitial && <Hero onInitialEntry={onInitialEntry} />}
      <div className="app-container">
        <NavBar />
        <div className="content" onScroll={onScroll}  >
          <HeaderBGProvider>

            <Switch>
              {routes.map(route => <Route key={route.path} exact render={() => <RouteLayout opacity={opacity}>{route.component}</RouteLayout>} path={route.path} />)}
            </Switch>
          </HeaderBGProvider>

        </div>
      </div>
      <UserMsg userMsg={userMsg} />
      <AudioPlayer />
    </main>
  )
}


const RouteLayout = ({ opacity, children }) => {
  return (<>
    <AppHeader opacity={opacity} />
    {children}
  </>)
}
