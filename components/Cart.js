import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';

import User from './User';
import CartItem from './CartItem';
import calcTotalPrice from '../lib/calcTotalPrice';

const LOCAL_STATE_QUERY = gql`
    query{
        cartOpen @client
    }
`;

const TOGGLE_CART_MUTATION = gql`
    mutation{
        toggleCart @client
    }
`;

const Composed = adopt({
    user: ({render}) => <User>{render}</User>,
    toggleCart: ({render}) => <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>,
    localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
});

const Cart = props => (
    <Composed>
        {({ user, toggleCart, localState }) => {
            if(user.loading) return <p>...loading</p>
            if(!user.loading && !user.data) return <p>no data found</p>
            const me = user.data.me;
            if(!me)return null;
            return(
                <div style={{ display: `${localState.data.cartOpen ? 'block': 'none'}` }}>
                    <header>
                        <button onClick={toggleCart}>close &times;</button>
                        <h3>{me.name} Cart [cart is {localState.data.cartOpen ? 'open': 'closed'}]</h3>
                        <p>You have {me.cart.length} item{me.cart.length === 1 ? '' : 's'} in your cart</p>
                    </header>
                    <ul>
                        {me.cart.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}
                    </ul>
                    <footer>
                        <p>{calcTotalPrice(me.cart)}</p>
                        <button>Checkout</button>
                    </footer>
                </div>
            )
        }}
    </Composed>
)

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };