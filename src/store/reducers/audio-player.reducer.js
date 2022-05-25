

const initialState = {
    player: null,
}



export function audioPlayerReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PLAYER':
            return { ...state, player: action.player }
        default:
            return state
    }
}
