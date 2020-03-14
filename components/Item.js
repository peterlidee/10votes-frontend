import React, { Component } from 'react';
import PropTypes, { string } from 'prop-types';
import Link from 'next/link';
import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';

class Item extends Component{
    static propTypes = {
        item: PropTypes.object.isRequired
    };
    render(){
        const {item} = this.props;
        return(
            <div>
                <Link href={{
                    pathname: '/item',
                    query: { id: item.id },
                }}>
                    <a>
                        {item.title}
                        {item.image && <img src={item.image} alt={item.title} />}
                    </a>
                </Link>
                <Link
                    href={{
                    pathname: 'update',
                    query: { id: item.id },
                    }}>
                    <a>Edit ✏️</a>
                </Link>
                <AddToCart id={item.id} />
                <DeleteItem id={item.id}>delete item</DeleteItem>
            </div>
        );
    }
}

export default Item;