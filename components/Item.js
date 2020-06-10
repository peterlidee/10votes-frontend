import React, { Component } from 'react';
import PropTypes, { string } from 'prop-types';
import Link from 'next/link';
import DeleteItem from './DeleteItem';
import Voting from './Voting';


class Item extends Component{
    static propTypes = {
        item: PropTypes.object.isRequired,
        //myVotes: PropTypes.object.isRequired,
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
                        {item.image && item.location &&
                            <img src={item.image} alt={`item ${item.id} in ${item.location.name}`} />}
                        {item.image && !item.location &&
                            <img src={item.image} alt={`item ${item.id}`} />}
                    </a>
                </Link>

                {item.location && <div>location: 
                    <Link 
                        href="/location/[countryCode]/[place]" 
                        as={`/location/${item.location.country.countryCode}/${item.location.slug}`}
                    >
                        <a>{item.location.name}</a>
                    </Link></div>}

                <div>votes: {item.voteCount}</div>
                {item.tags.length == 0 && <div>No tags</div>}
                {item.tags.length > 0 && 
                    <div>tags: {item.tags.map(tag => (
                        <Link key={tag.id} href="/tags/[tagslug]" as={`/tags/${tag.slug}`}><a>#{tag.name}</a></Link>
                    ))}</div>
                }

                {this.props.showEdit && <>
                    <Link
                        href={{
                            pathname: 'update',
                            query: { id: item.id },
                        }}>
                        <a>Edit ✏️</a>
                    </Link>
                    <DeleteItem id={item.id}>delete item</DeleteItem>
                </>}

                {!this.props.hideVote && <Voting currentItemId={item.id} />}

            </div>
        );
    }
}

export default Item;