import { Home } from './pages/home.jsx'
import { Search } from './pages/search.jsx'
import { PlaylistDetails } from './pages/playlist-details.jsx'



export default [
    {
        path: '/search',
        component: Search,
    },

    {
        path: '/',
        component: Home,
    },
    {
        path: '/playlist/:playlistId?',
        component: PlaylistDetails,
    },



]