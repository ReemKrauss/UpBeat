

const initialState = {
    player: null,
    isPlaying: false,
    songs:[],
    currSongIdx:0,
    playlistName:'',
    playlistId:'',
    currTimePass:0,
}



export function audioPlayerReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PLAYER':
            return { ...state, player: action.player }
        case 'TOGGLE_PLAY':
            return { ...state, isPlaying: action.isPlaying }
        default:
            return state
    }
}
