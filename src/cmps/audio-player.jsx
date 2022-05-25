import React from 'react'
import { connect } from 'react-redux'
import YouTube from 'react-youtube';
import { setPlayer, togglePlay } from '../store/actions/audio-player.action';


class _AudioPlayer extends React.Component {
    state = {
        isPlayerReady: false,
    }

    onReady = (ev) => {
        this.props.setPlayer(ev.target)
        this.setState({ isPlayerReady: true },this.onTogglePlay)
    }

    onTogglePlay = () => {
        this.props.togglePlay()
    }

    render() {
       const { isPlayerReady } = this.state
        return <div className={isPlayerReady ?'audio-player':'audio-player hidden'}>
            <YouTube videoId="" opts={{
                height: '0',
                width: '0',
                playerVars: {
                    // https://developers.google.com/youtube/player_parameters
                    autoplay: 0,
                },
            }} onReady={this.onReady} />
            <button onClick={this.onTogglePlay}>play/stop</button>
        </div>
    }
}


function mapStateToProps(state) {
    return {
        player: state.audioPlayerModule.player,
        isPlaying: state.audioPlayerModule.isPlaying,
    }
}
const mapDispatchToProps = {
    setPlayer,
    togglePlay,
}

export const AudioPlayer = connect(mapStateToProps, mapDispatchToProps)(_AudioPlayer)
