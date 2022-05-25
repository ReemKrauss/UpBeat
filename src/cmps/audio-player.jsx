import React from 'react'
import { connect } from 'react-redux'
import YouTube from 'react-youtube';

import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa'

import { setPlayer, togglePlay, changeSong } from '../store/actions/audio-player.action';


class _AudioPlayer extends React.Component {
    state = {
    }

    onReady = (ev) => {
        console.log('lol');
        this.props.setPlayer(ev.target)
        if (!this.props.isPlaying) this.onTogglePlay()
        else ev.target.playVideo()
    }

    onTogglePlay = () => {
        this.props.togglePlay()
    }
    onForward = () => {
        const { songs, currSongIdx } = this.props.miniPlaylist
        const newSongIdx = (currSongIdx === songs.length - 1) ? 0 : currSongIdx + 1
        this.props.changeSong(newSongIdx)
    }
    onBackward = () => {
        const { songs, currSongIdx } = this.props.miniPlaylist
        if (this.props.currTimePass) {
            this.props.player.seekTo(0)
            return
        }
        const newSongIdx = (currSongIdx === 0) ? songs.length - 1 : currSongIdx - 1
        this.props.changeSong(newSongIdx)
    }

    

    render() {
        const { songs, currSongIdx, playlistName, playlistId } = this.props.miniPlaylist
        const song = songs[currSongIdx]
        if (!song) return
        return <div className="audio-player">
            <YouTube videoId={song.id} opts={{
                height: '0',
                width: '0',
                playerVars: {
                    // https://developers.google.com/youtube/player_parameters
                    autoplay: 0,
                },
            }} onReady={this.onReady} />
            <FaBackward className="changeSong-btn" onClick={this.onBackward} />
            {!this.props.isPlaying && <FaPlay className="play-btn" onClick={this.onTogglePlay} />}
            {this.props.isPlaying && <FaPause className="play-btn" onClick={this.onTogglePlay} />}
            <FaForward className="changeSong-btn" onClick={this.onForward} />
        </div>
    }
}


function mapStateToProps(state) {
    return {
        player: state.audioPlayerModule.player,
        isPlaying: state.audioPlayerModule.isPlaying,
        miniPlaylist: state.audioPlayerModule.miniPlaylist,
        currTimePass: state.audioPlayerModule.currTimePass,
    }
}
const mapDispatchToProps = {
    setPlayer,
    togglePlay,
    changeSong,
}

export const AudioPlayer = connect(mapStateToProps, mapDispatchToProps)(_AudioPlayer)
