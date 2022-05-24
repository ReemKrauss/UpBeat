import { Home } from './pages/home.jsx'
import { Search } from './pages/search.jsx'
import { StationDetails } from './pages/station-details.jsx'



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
        path: '/station/:stationId',
        component: StationDetails,
    },



]