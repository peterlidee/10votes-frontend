import React, { Component } from 'react';
import PropTypes, { string } from 'prop-types';
import Link from 'next/link';

class Item extends Component{
    static PropTypes = {
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
            </div>
        );
    }
}

export default Item;