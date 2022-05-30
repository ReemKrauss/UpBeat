import React from 'react'
import { Link } from 'react-router-dom';

import { connect } from 'react-redux'
import YouTube from 'react-youtube';

import { FaForward, FaBackward, FaHeart } from 'react-icons/fa'


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
        this.props.setCurrTimePass(0)
        if (this.props.currTimePass < 1) return
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
        this.props.setCurrTimePass(0)
        if (this.props.currTimePass < 1) return
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
        if (!this.props.player) return
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
                        <img className='song-img' src={song.imgUrl} />
                        <div>
                            <div className='song-title'>
                            <h4 className='song-txt'>{song.title}</h4>
                            </div>
                            <span className='playlist-name'>{playlistName}</span>
                        </div>
                    </Link>
                    <FaHeart className='like-btn' />
                </section>

                <section className='player-controlers'>
                    <div className="player-btns">
                        <svg role="img" height="16" width="16" viewBox="0 0 16 16" className={`shuffle btn ${props.isShuffled}`} onClick={props.toggleShuffle}><path d="M13.151.922a.75.75 0 10-1.06 1.06L13.109 3H11.16a3.75 3.75 0 00-2.873 1.34l-6.173 7.356A2.25 2.25 0 01.39 12.5H0V14h.391a3.75 3.75 0 002.873-1.34l6.173-7.356a2.25 2.25 0 011.724-.804h1.947l-1.017 1.018a.75.75 0 001.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 00.39 3.5z"></path><path d="M7.5 10.723l.98-1.167.957 1.14a2.25 2.25 0 001.724.804h1.947l-1.017-1.018a.75.75 0 111.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 11-1.06-1.06L13.109 13H11.16a3.75 3.75 0 01-2.873-1.34l-.787-.938z"></path></svg>
                        <FaBackward className="change-song btn" onClick={this.onBackward} />
                        <button className="play btn" onClick={this.onTogglePlay}>
                            {!props.isPlaying && <svg role="img" height="16" width="16" className='play-svg' viewBox="0 0 16 16" ><path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path></svg>}
                            {props.isPlaying && <svg role="img" height="16" width="16" className='pause-svg' viewBox="0 0 16 16" ><path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>}
                        </button>
                        <FaForward className="change-song btn" onClick={this.onForward} />
                        <svg role="img" height="16" width="16" viewBox="0 0 16 16" className={`repeat btn ${state.isRepeat}`} onClick={this.onToggleRepeat} ><path d="M0 4.75A3.75 3.75 0 013.75 1h8.5A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 111.06 1.06L9.811 12h2.439a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25h-8.5A2.25 2.25 0 001.5 4.75v5A2.25 2.25 0 003.75 12H5v1.5H3.75A3.75 3.75 0 010 9.75v-5z"></path></svg>
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
                    {state.isMute && <svg role="presentation" height="16" width="16" className="volume-btn btn" onClick={this.onToggleMute} aria-label="Volume off" id="volume-icon" viewBox="0 0 16 16" ><path d="M13.86 5.47a.75.75 0 00-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 008.8 6.53L10.269 8l-1.47 1.47a.75.75 0 101.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 001.06-1.06L12.39 8l1.47-1.47a.75.75 0 000-1.06z"></path><path d="M10.116 1.5A.75.75 0 008.991.85l-6.925 4a3.642 3.642 0 00-1.33 4.967 3.639 3.639 0 001.33 1.332l6.925 4a.75.75 0 001.125-.649v-1.906a4.73 4.73 0 01-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 01-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path></svg>}
                    {!state.isMute && <svg role="presentation" width="16" height="16" className='volume-btn btn' onClick={this.onToggleMute} aria-label="Volume high" id="volume-icon" viewBox="0 0 16 16" ><path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"></path><path d="M11.5 13.614a5.752 5.752 0 000-11.228v1.55a4.252 4.252 0 010 8.127v1.55z"></path></svg>}
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
