


export const audioPlayerService = {
    togglePlay,
    
}

function togglePlay(player, isPlaying) {
    console.log('2');
    if (!player) return console.log('no player');
    if (!isPlaying) player.playVideo()
    else player.pauseVideo()
}