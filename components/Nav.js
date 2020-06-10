import Link from 'next/link';
import { Mutation } from 'react-apollo';

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
  
                    {(me) && (
                        <>
                            <span>my votes: </span>
                            <Link href="/myvotes">
                                <a>my votes: {me.votes.length}</a>
                            </Link>
                            <Link href="/myitems">
                                <a>my pics: {me.items.length}</a>
                            </Link>
                            <span>{me.name}</span>
                            <Link href="/sell">
                                <a>sell</a>
                            </Link>
                            <Signout />
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