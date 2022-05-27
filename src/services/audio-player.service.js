


export const audioPlayerService = {
    togglePlay,
    shuffleSongs,
    unShuffleSongs,
}

function togglePlay(player, isPlaying) {
    if (!player) return console.log('no player');
    if (!isPlaying) player.playVideo()
    else player.pauseVideo()
}

function shuffleSongs(songs, satrtIdx) {
    songs.sort((songA, songB) => {
        if (songA.initIdx === satrtIdx) return -1
        if (songB.initIdx === satrtIdx) return 1
        return Math.random() - 0.5
    })
}

function unShuffleSongs(songs) {
    songs.sort((songA, songB) => {
        if (songA.initIdx<songB.initIdx) return-1
        if (songA.initIdx>songB.initIdx) return 1
        return 0
    })
}