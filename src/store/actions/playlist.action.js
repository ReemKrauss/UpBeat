import { playlistService } from "../../services/playlist.service";

export function loadPlaylists() { 
    return async (dispatch, getState) => {
        try {
            const {filterBy} = getState().playlistModule
            const playlists = await playlistService.query(filterBy)
            dispatch({ type: 'SET_PLAYLISTS', playlists }) 
        } catch (err) {
            console.log('err', err)
        }
    }
}
