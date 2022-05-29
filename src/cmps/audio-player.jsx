import React from 'react'
import { Link } from 'react-router-dom';

import { connect } from 'react-redux'
import YouTube from 'react-youtube';

import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaVolumeMute,FaHeart } from 'react-icons/fa'
import { FiRepeat } from 'react-icons/fi'
import { TiArrowShuffle } from 'react-icons/ti'

import { setPlayer, togglePlay, changeSong, setCurrTimePass, toggleShuffle } from '../store/actions/audio-player.action';


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

    onEnd = () => {
        if (this.state.isRepeat) this.props.player.seekTo(0)
        else this.onForward()
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

    onToggleMute = () => {
        this.setState({ isMute: !this.state.isMute }, () => {
            if (this.state.isMute) this.props.player.setVolume(0)
            else this.props.player.setVolume(this.state.volume)
        })

    }

    onChangeVolume = (ev) => {
        this.setState({ volume: +ev.target.value }, () => this.props.player.setVolume(+ev.target.value))
        if (this.state.isMute) {
            this.setState({ isMute: false })
        }
    }

    onChangeDuration = (ev, boolean) => {
        this.props.setCurrTimePass(+ev.target.value)
        if (boolean) this.props.player.seekTo(+ev.target.value)
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
        const { state, props } = this
        const { songs, currSongIdx, playlistName, playlistId } = props.miniPlaylist
        const volume = (state.isMute) ? 0 : state.volume
        const song = songs[currSongIdx]
        if (!song) return
        return <>
            <YouTube videoId={song.id} opts={{
                height: '0',
                width: '0',
                playerVars: {
                },
            }} onReady={this.onReady} onStateChange={this.onStateChange} onEnd={this.onEnd} />
            <div className="audio-player">
                <section className="song-container flex">
                    <Link to={`/playlist/${playlistId}`} className="song-preview flex">
                        <img src={song.imgUrl} />
                        <div>
                            <h4 className='song-title'>{song.title}</h4>
                            <span className='playlist-name'>{playlistName}</span>
                        </div>
                    </Link>
                    <FaHeart className='like-btn'/>
                </section>

                <section className='player-controlers'>
                    <div className="player-btns">
                        <TiArrowShuffle className={`shuffle btn ${props.isShuffled}`} onClick={props.toggleShuffle} />
                        <FaBackward className="change-song btn" onClick={this.onBackward} />
                        <button className="play btn" onClick={this.onTogglePlay}>
                            {!props.isPlaying && <FaPlay className='play-svg' />}
                            {props.isPlaying && <FaPause className='pause-svg' />}
                        </button>
                        <FaForward className="change-song btn" onClick={this.onForward} />
                        <FiRepeat className={`repeat btn ${state.isRepeat}`} onClick={this.onToggleRepeat} />
                    </div>
                    <div className="time-container flex">
                        <span>{this.currTimePassStr}</span>
                        <div className='player-timer'>
                            <progress min="0" max={song.duration.total} value={this.props.currTimePass}></progress>
                            <input type="range" id="duration" className="duration" min="0" max={song.duration.total} value={this.props.currTimePass} onChange={this.onChangeDuration} onMouseUp={(ev) => this.onChangeDuration(ev, true)} />
                        </div>
                        <span>{song.duration.display}</span>
                    </div>
                </section>
                <div className='volume flex'>
                    {!state.isMute && <FaVolumeUp className="volume-btn btn" onClick={this.onToggleMute} />}
                    {state.isMute && <FaVolumeMute className="volume-btn btn" onClick={this.onToggleMute} />}
                    <div className='player-timer volume-control'>
                        <progress className='volume-progress' min="0" max="100" value={volume}></progress>
                        <input type="range" id="volume-slider" className="volume-slider" min="0" max="100" value={volume} onChange={this.onChangeVolume} />
                    </div>
                </div>
            </div>
        </>
    }
}


function mapStateToProps(state) {
    return {
        player: state.audioPlayerModule.player,
        isPlaying: state.audioPlayerModule.isPlaying,
        miniPlaylist: state.audioPlayerModule.miniPlaylist,
        currTimePass: state.audioPlayerModule.currTimePass,
        isShuffled: state.audioPlayerModule.isShuffled,
    }
}
const mapDispatchToProps = {
    setPlayer,
    togglePlay,
    changeSong,
    setCurrTimePass,
    toggleShuffle,
}

export const AudioPlayer = connect(mapStateToProps, mapDispatchToProps)(_AudioPlayer)
