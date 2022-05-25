

const initialState = {
    player: null,
}



export function playlistReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PLAYER':
            return { ...state, player: action.player }
        default:
            return state
    }
}
