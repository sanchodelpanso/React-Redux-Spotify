import React, {PropTypes} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as artistActions from '../actions/artist.actions';
import Grid from './grid.component';

class ArtistComponent extends React.Component {

    componentWillMount() {
        this.props.actions.loadArtist( this.props.params.id );
    }

    render() {
        if(!this.props.artist.albums){
            return <section></section>;
        }

        return (
            <section>
                <div className="container">
                    <div className="artist__header">
                        <h1 className="artist__name">{this.props.artist.name}</h1>
                    </div>
                </div>
                <div className="page__angle__bg page__grid__wrap">
                    <div className="container">
                        <Grid items={this.props.artist.albums}/>
                    </div>
                </div>
            </section>
        );
    }
}

ArtistComponent.propTypes = {
    artist: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        artist: state.artist
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(artistActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistComponent);