import Link from 'next/link';
import { Mutation } from 'react-apollo';
import { TOGGLE_CART_MUTATION, LOCAL_STATE_QUERY } from './Cart';
import CartCount from './CartCount';

import User from './User';
import Signout from './Signout';

const Nav = () => (
    <User>
        {( { loading, error, data } ) => {
            if(loading) return <p>...loading</p>
            
            // not logged in then?
            if(!loading && !data) return(
                <>
                    <p>no data found</p>
                    <Link href="/signup">
                        <a>sign in</a>
                    </Link>
                </>
            );
            
            const { me } = data;
            console.log('me', me);

            return(
                <div>
                    <Link href="/">
                        <a>home</a>
                    </Link>
                    <Link href="/items">
                        <a>items</a>
                    </Link>
  
                    {(me) && (
                        <>
                            <span>my votes: </span>
                            <span>my pics: {me.items.length}</span>
                            <span>{me.name}</span>
                            <Link href="/sell">
                                <a>sell</a>
                            </Link>
                            <Signout />
                            <Mutation mutation={TOGGLE_CART_MUTATION}>
                                {(toggleCart) => (
                                    <button onClick={toggleCart}>
                                        my cart 
                                        <CartCount count={me.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)} />
                                    </button>
                                )}
                            </Mutation>
                        </>
                    )}

                    {(!me) && (
                        <Link href="/signup">
                            <a>sign in</a>
                        </Link>
                    )}

                </div>
            )
        }}
    </User>
);

export default Nav;