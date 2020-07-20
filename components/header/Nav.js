import Link from 'next/link';
import User from '../account/User';
import Logout from '../account/Logout';
import IconUpload from './IconUpload';

const Nav = () => (
    <User>
        {({ loading, error, data }) => {
            
            if(loading) return <p>...loading</p>
            
            // not logged in then?
            if(!loading && !data) return null;
            
            const { me } = data;
            //console.log('me', me);

            return(
                <nav className="site__menu">
  
                    {(me) && (
                        <>
                            <Link href="/myvotes">
                                <a className="myvotes">my votes: {me.votes.length}</a>
                            </Link>
                            <Link href="/myitems">
                                <a className="myitems">my pics: {me.items.length}</a>
                            </Link>
                        </>
                    )}

                    <Link href="/addapicture">
                        <a className="upload">
                            <IconUpload />
                            <span className="upload__label">upload</span>
                        </a>
                    </Link>

                    {(me) && (
                        <Logout />
                    )}

                    {(!me) && (
                        <Link href="/login">
                            <a>log in</a>
                        </Link>
                    )}

                </nav>
            )
        }}
    </User>
);

export default Nav;