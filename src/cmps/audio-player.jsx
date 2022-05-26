import React from 'react'
import { connect } from 'react-redux'
import YouTube from 'react-youtube';

import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'
import { FiRepeat } from 'react-icons/fi'

import { setPlayer, togglePlay, changeSong, setCurrTimePass } from '../store/actions/audio-player.action';


class _AudioPlayer extends React.Component {
    state = {
        isRepeat: false,
        isMute: false,
        volume: 100,
    }

    timerIntervalId

    componentWillUnmount = () => {
        clearInterval(this.timerIntervalId)
    }

    onReady = (ev) => {
        this.props.setPlayer(ev.target)
        if (!this.props.isPlaying) this.onTogglePlay()
        else ev.target.playVideo()
        ev.target.setVolume(this.state.volume)
    }

    onStateChange = (ev) => {
        if (ev.data === 3 || ev.data === -1) return

        if (ev.data === 2) {
            clearInterval(this.timerIntervalId)
        }
        if (ev.data === 1) {
            if (this.timerIntervalId) clearInterval(this.timerIntervalId)
            this.timerIntervalId = setInterval(() => {
                const currTimePass = this.props.player.getCurrentTime()
                this.props.setCurrTimePass(currTimePass)
            }, 1000)
        }
    }

    onTogglePlay = () => {
        this.props.togglePlay()
    }

    onForward = () => {
        if (this.state.isRepeat) {
            this.onToggleRepeat()
        }
        const { songs, currSongIdx } = this.props.miniPlaylist
        const newSongIdx = (currSongIdx === songs.length - 1) ? 0 : currSongIdx + 1
        this.props.changeSong(newSongIdx)
    }

    onBackward = () => {
        const { songs, currSongIdx } = this.props.miniPlaylist
        if (this.props.currTimePass > 3) {
            this.props.player.seekTo(0)
            return
        }
        if (this.state.isRepeat) {
            this.onToggleRepeat()
        }
        const newSongIdx = (currSongIdx === 0) ? songs.length - 1 : currSongIdx - 1
        this.props.changeSong(newSongIdx)
    }

    onToggleRepeat = () => {
        this.setState({ isRepeat: !this.state.isRepeat })
    }

    onChangeVolume = (ev) => {
        this.setState({ volume: ev.target.value }, () => this.props.player.setVolume(ev.target.value))
    }

    onToggleMute = () => {
        this.setState({ isMute: !this.state.isMute }, () => {
            if (this.state.isMute) this.props.player.setVolume(0)
            else this.props.player.setVolume(this.state.volume)
        })

    }

    get currTimePassStr() {
        const duration = this.props.currTimePass
        const mins = ~~(duration / 60)
        const secs = ~~duration % 60
        let ret = ''
        ret += '' + mins + ':' + (secs < 10 ? '0' : '')
        ret += '' + secs
        return ret
    }

    render() {
        const { songs, currSongIdx, playlistName, playlistId } = this.props.miniPlaylist
        const { state } = this
        const volume = (state.isMute) ? 0 : state.volume
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
            }} onReady={this.onReady} onStateChange={this.onStateChange} />
            <FaBackward className="change-song-btn" onClick={this.onBackward} />
            {!this.props.isPlaying && <FaPlay className="play-btn" onClick={this.onTogglePlay} />}
            {this.props.isPlaying && <FaPause className="play-btn" onClick={this.onTogglePlay} />}
            <FaForward className="change-song-btn" onClick={this.onForward} />
            <FiRepeat className="repeat-btn" onClick={this.onToggleRepeat} />
            <div>
<<<<<<< HEAD
                <span>{this.currTimePassStr}</span>
                <input type="range" id="duration" className="duration" min="0" max={song.duration.total} value={this.props.currTimePass} />
                <span>{song.duration.display}</span>
            </div>
            <div>
                <FaVolumeUp className="volume-btn" onClick={this.onToggleMute} />
                <input type="range" id="volume" className="volume" min="0" max="100" value={volume} onChange={this.onChangeVolume} />
=======
            <span>{this.props.currTimePass}</span>
            <input type="range" id="duration" name="duration" min="0" max={song.duration.total} value={this.props.currTimePass} />
            <span>{song.duration.display}</span>
>>>>>>> 31fb9029258172c75ff93790e670c776183c0b47
            </div>
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
    setCurrTimePass,
}

export const AudioPlayer = connect(mapStateToProps, mapDispatchToProps)(_AudioPlayer)
