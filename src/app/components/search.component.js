import React, {PropTypes} from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Subject} from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import * as searchActions from '../actions/search.actions';
import Grid from './grid.component';

class SearchComponent extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.changeSubject = new Subject();

        this.changeSubject
            .map(search => search.trim())
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(search => {
                this.props.actions.loadSearchResult(search, this.props.params.type);
            });
    }

    componentWillReceiveProps(newProps) {
        if(newProps.params.type !== this.props.params.type) {
            this.props.actions.loadSearchResult(newProps.search, newProps.params.type);
        }
    }

    handleChange(event) {
        this.props.actions.searchChanged( event.target.value );
        this.changeSubject.next( event.target.value );
    }

    render() {
        let searchHeader = {},
            items = this.props.params.type == 'artist' ? this.props.artists : this.props.albums;

        if(this.props.params.type == 'artist') {
            searchHeader = {
                link: '/search-type/album',
                linkName: 'Search by Album',
                placeholder: 'Search Some Artist'
            };
        } else {
            searchHeader = {
                link: '/search-type/artist',
                linkName: 'Search by Artists',
                placeholder: 'Search Some Album'
            };
        }

        return (
            <section>
                <div className="container">
                    <header className="search__header">
                        <h1>Ready to search your music?</h1>
                        <div>
                            <div className="search__input">
                                <i className="fa fa-search"></i>
                                <div>
                                    <Link to={searchHeader.link} className="header__link btn --inverse">{searchHeader.linkName}</Link>
                                    <input ref={this.observeInputChanges} type="text" placeholder={searchHeader.placeholder} value={this.props.search} onChange={this.handleChange}/>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
                <div className="page__angle__bg page__grid__wrap">
                    <div className="container">
                        <Grid items={items}/>
                    </div>
                </div>
            </section>
        );
    }
}

SearchComponent.propTypes = {
    search: PropTypes.string.isRequired,
    artists: PropTypes.array.isRequired,
    albums: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        search: state.search,
        artists: state.artists,
        albums: state.albums
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(searchActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
