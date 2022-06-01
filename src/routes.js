import { Home } from './pages/home.jsx'
import { Search } from './pages/search.jsx'
import { PlaylistDetails } from './pages/playlist-details.jsx'
import { GenrePage } from './pages/genre-page.jsx'



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
    {
        path: '/genre/:genreTag?',
        component: GenrePage,
    },



]