import { playlistService } from "../../services/playlist.service";

export function setPlayer(player) {
    return (dispatch) => {
        dispatch({
            type: 'SET_PLAYER',
            player
        })
    }
}