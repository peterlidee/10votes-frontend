import React, { Component } from 'react';
import PropTypes, { string } from 'prop-types';
import Link from 'next/link';
import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';

import Voting from './Voting';


class Item extends Component{
    static propTypes = {
        item: PropTypes.object.isRequired,
        myVotes: PropTypes.object.isRequired,
    };
    render(){
        const {item} = this.props;
        //console.log('item', this.props.item);
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
                <span>votes: {item.voteCount}</span>
                <Link
                    href={{
                        pathname: 'update',
                        query: { id: item.id },
                    }}>
                    <a>Edit ✏️</a>
                </Link>
                <AddToCart id={item.id} />
                <DeleteItem id={item.id}>delete item</DeleteItem>
                <Voting currentItemId={item.id} myVotes={this.props.myVotes} />
            </div>
        );
    }
}

export default Item;