import React, {PropTypes} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Subject} from 'rxjs';

import * as albumActions from '../actions/album.actions';
import Track from './track-item.component';

class AlbumComponent extends React.Component {

    componentWillMount() {
        this.props.actions.loadAlbum( this.props.params.id );

        this.state = {
            trackPlay: new Subject()
        }
    }

    render() {
        let album = this.props.album,
            img;

        if(!album.name) {
            return <section></section>;
        }

        if(album.images.medium) {
            img = <img src={album.images.medium} className="album__image"/>;
        }

        return (
            <section className="album__page">
                <div className="page__angle__bg --inverse__side">
                    <div className="container text-right">
                        {img}
                    </div>
                </div>
                <div className="container">
                    <div className="album__header">
                        <h1 className="album__name">{album.name}</h1>
                    </div>
                    <div className="album__tracklist">
                        {
                            album.tracks.items.map(track =>
                                <Track track={track} key={track.id} trackPlay={this.state.trackPlay}/>
                            )
                        }
                    </div>
                </div>
            </section>
        );
    }
}

AlbumComponent.propTypes = {
    album: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        album: state.album
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(albumActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumComponent);