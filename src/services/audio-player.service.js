


export const audioPlayerService = {
    togglePlay,
    
}

function togglePlay(player, isPlaying) {
    if (!player) return console.log('no player');
    if (!isPlaying) player.playVideo()
    else player.pauseVideo()
}