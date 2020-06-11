import Link from 'next/link';
import { Mutation } from 'react-apollo';

import User from './account/User';
import Logout from './account/Logout';

const Nav = () => (
    <User>
        {( { loading, error, data } ) => {
            if(loading) return <p>...loading</p>
            
            // not logged in then?
            if(!loading && !data) return(
                <>
                    <p>no data found</p>
                    <Link href="/login">
                        <a>log in</a>
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
                            <Logout />
                        </>
                    )}

                    {(!me) && (
                        <Link href="/login">
                            <a>log in</a>
                        </Link>
                    )}

                </div>
            )
        }}
    </User>
);

export default Nav;