export function playlistReducer(state = { playlists: [] }, action) {
    switch (action.type) {
        case 'SET_PLAYLISTS':
            return { ...state, playlists: action.playlists }
        default:
            return state
    }
}
