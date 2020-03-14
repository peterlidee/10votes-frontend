import React from 'react';
import PropTypes from 'prop-types';
import RemoveFromCart from './RemoveFromCart';
 
const CartItem = ({ cartItem }) => {
    // first check if the item exists
    if(!cartItem.item) return (
        <div>
            <p>This item has been removed</p>
            <RemoveFromCart id={cartItem.id} />
        </div>
    );
    return(
        <div>
            <img src={cartItem.item.image} alt={cartItem.item.title} width="50" />
            <h4>{cartItem.item.title} - #{cartItem.quantity}</h4>
            <p>{cartItem.item.description}</p>
            <RemoveFromCart id={cartItem.id} />
        </div>
    )
};

CartItem.propTypes = {
    cartItem: PropTypes.object.isRequired
}

export default CartItem;