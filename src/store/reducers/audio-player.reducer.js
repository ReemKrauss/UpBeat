

const initialState = {
    player: null,
    isPlaying: false,
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
