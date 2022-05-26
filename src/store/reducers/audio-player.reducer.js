

const initialState = {
    player: null,
    isPlaying: false,
    miniPlaylist:{
        songs:[],
        currSongIdx:0,
        playlistName:'',
        playlistId:'',

    },
    currTimePass: 0,
}



export function audioPlayerReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PLAYER':
            return { ...state, player: action.player }
        case 'TOGGLE_PLAY':
            return { ...state, isPlaying: action.isPlaying }
        case 'SET_MINI_PLAYLIST':
            return { ...state, miniPlaylist: action.miniPlaylist}
        case 'CHANGE_SONG':
            return { ...state, miniPlaylist: {...state.miniPlaylist,currSongIdx:action.currSongIdx}}
        default:
            return state
    }
}
