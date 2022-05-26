import { Home } from './pages/home.jsx'
import { Search } from './pages/search.jsx'
import { Hero } from './pages/hero.jsx'
import { PlaylistDetails } from './pages/playlist-details.jsx'



export default [
    {
        path: '/',
        component: Hero,
    },
    {
        path: '/search',
        component: Search,
    },

    {
        path: '/home',
        component: Home,
    },
    {
        path: '/playlist/:playlistId?',
        component: PlaylistDetails,
    },



]