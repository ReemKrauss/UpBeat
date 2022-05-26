import { playlistService } from "../../services/playlist.service";
import { audioPlayerService } from "../../services/audio-player.service";

export function setPlayer(player) {
    return (dispatch) => {
        dispatch({
            type: 'SET_PLAYER',
            player
        })
    }
}


export function togglePlay() {
    return (dispatch, getState) => {
        const { player, isPlaying } = getState().audioPlayerModule
        audioPlayerService.togglePlay(player, isPlaying)
        dispatch({
            type: 'TOGGLE_PLAY',
            isPlaying: !isPlaying
        })

    }
}

export function changeSong(currSongIdx){
    return(dispatch)=>{
       dispatch({
           type:'CHANGE_SONG',
           currSongIdx
       })
    }
}

export function setMiniPlaylist(playlistId, songIdx = 0){
    return async (dispatch) => {
        const miniPlaylist = await playlistService.getMiniPlaylist(playlistId, songIdx)
        dispatch({
            type: 'SET_MINI_PLAYLIST',
            miniPlaylist
        })

    }
}