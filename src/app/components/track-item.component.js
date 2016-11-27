import React, {PropTypes} from 'react';

export default class TrackItemComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.toogleState = this.toogleState.bind(this);
        this.audioTimeUpdate = this.audioTimeUpdate.bind(this);
        this.audioEnded = this.audioPaused.bind(this);

        this.audio = null;

        this.state = {
            isActive: false,
            progress: 0
        };
    }

    componentDidMount() {
        this.audio = new Audio(this.props.track.preview_url);

        this.audio.addEventListener('timeupdate', this.audioTimeUpdate);
        this.audio.addEventListener('ended', this.audioPaused);

        this.props.trackPlay.subscribe(track => {
            if(track !== this.props.track.id) {
                this.audio.pause();
                this.audioPaused();
            }
        });
    }

    componentWillUnmount() {
        this.audio.pause();
        this.audioPaused();

        this.audio.removeEventListener('timeupdate', this.audioTimeUpdate);
        this.audio.removeEventListener('ended', this.audioPaused);

        this.props.trackPlay.unsubscribe();
    }

    audioTimeUpdate() {
        if(!this.state.isActive)
            return;

        this.setState({
            isActive: this.state.isActive,
            progress: this.audio.currentTime * 100 / this.audio.duration
        });
    }

    audioPaused() {
        this.setState({
            isActive: false,
            progress: this.state.progress
        });
    }

    toogleState() {
        if(!this.state.isActive) {
            this.audio.play();
            this.props.trackPlay.next( this.props.track.id );
        } else {
            this.audio.pause();
        }

        this.setState({
            isActive: !this.state.isActive,
            progress: this.state.progress
        });
    }

    render() {
        let button = <i className="fa fa-play"></i>;

        if(this.state.isActive) {
            button = <i className="fa fa-pause"></i>;
        }

        const progressStyle = {
            right: (100 - this.state.progress) + '%'
        };


        return (
            <div key={this.props.track.id} className={this.state.isActive?'track__item active':'track__item'}>
                <button className="btn --inversed" onClick={this.toogleState}>
                    {button}
                </button>
                <h5>{this.props.track.name}</h5>

                <div className="track__percentage">
                    <div className="track__played" style={progressStyle}></div>
                </div>
            </div>
        );
    }
}

TrackItemComponent.propTypes = {
    track: PropTypes.object.isRequired,
    trackPlay: PropTypes.object.isRequired
};