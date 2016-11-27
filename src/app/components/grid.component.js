import React, {PropTypes} from 'react';
import { Link } from 'react-router';


export default class GridComponent extends React.Component {

    shouldComponentUpdate(newProps) {
        if( newProps.items == this.props.items)
            return false;

        return true;
    }

    render() {
        let items = this.props.items,
            self = this,
            gridItem = function( item ) {
                let img = <i className="fa fa-spotify grid__item__no__image"></i>;

                if(item.images.medium) {
                    img = <img src={item.images.medium}/>;
                }

                return (
                    <div className="grid__item" key={item.id}>
                        <div className="grid__item__content__wrap">
                            <div className="grid__item__content">
                                {img}
                                <Link to={'/' + item.type + '/' + item.id} />
                                <div className="grid__item__info">
                                    <span className="btn --inverse">{item.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            };

        return (
            <div className="grid__container --grid__columns__4">
                {items.map((item) =>
                    {return gridItem( item );}
                )}
            </div>
        );
    }
}

GridComponent.propTypes = {
    items: PropTypes.array.isRequired
};