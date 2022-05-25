import React from 'react'
import { connect } from 'react-redux'
import YouTube from 'react-youtube';


class _AudioPlayer extends React.Component {
    state={

    }

    onReady = (ev) => {
        this.setState(prevState => ({ ...prevState, isPlayerReady: true }))
        this.props.setPlayer(ev.target)
        this.props.player.playVideo()
    }



    render() {
        return <div className="audio-player">
            <YouTube videoId="2g811Eo7K8U" opts={{
                height: '0',
                width: '0',
                playerVars: {
                    // https://developers.google.com/youtube/player_parameters
                    autoplay: 1,
                },
            }} onReady={this.onReady} />
        </div>
    }
}


function mapStateToProps(storeState) {
    return {

    }
}
const mapDispatchToProps = {

}

export const AudioPlayer = connect(mapStateToProps, mapDispatchToProps)(_AudioPlayer)
