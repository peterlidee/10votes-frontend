import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
    mutation REMOVE_FROM_CART_MUTATION($id: ID!){
        removeFromCart(id: $id){
            id
        }
    }
`;

class RemoveFromCart extends React.Component{
    static propTypes = {
        id: PropTypes.string.isRequired
    }
    // this gets called as soon as we get a response back from the server after a mutation has performed
    update = (cache, payload)=>{
        // 1. read the cache
        const data = cache.readQuery({ query: CURRENT_USER_QUERY });
        // 2. remove item from cart
        const cartItemId = payload.data.removeFromCart.id;
        // make a copy of cart and remove removed item from it
        const updatedCart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
        // make a copy from data and add updatedCart
        const newData = {
            ...data,
            me: {
                ...data.me,
                cart: updatedCart
            }
        };
        // 3. write back to cache
        cache.writeQuery({ 
            query: CURRENT_USER_QUERY, 
            data: newData,
        });
    }
    render(){
        return(
            <Mutation 
                mutation={REMOVE_FROM_CART_MUTATION} 
                variables={{ id: this.props.id}}
                update={this.update}
                optimisticResponse={{
                    __typename: 'Mutation',
                    removeFromCart: {
                        __typename: 'CartItem',
                        id: this.props.id
                    }
                }}>
                    {( removeFromCart, { loading, error } ) => (
                        <button onClick={() => removeFromCart().catch(err => alert(err))} disabled={loading}>remove item &times;</button>
                    )}
            </Mutation>
        );
    }
}

export default RemoveFromCart;