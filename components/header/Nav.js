import Link from 'next/link';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import MenuContext from '../context/MenuContext';

import Logout from '../account/Logout';
import UploadButton from '../snippets/UploadButton';
import CurrentItemsAndVotes from './CurrentItemsAndVotes';


const Nav = () => {
    const { error, data, loading } = useContext(UserContext);
    const { menuToggle, setMenuToggle } = useContext(MenuContext);
    return(
        <>
            <button className={menuToggle ? "menu-toggle__button menu-toggle__button--open" : "menu-toggle__button menu-toggle__button--close"} type="button" onClick={() => {
                setMenuToggle(!menuToggle);
            }}>
                <div className="ham ham--1"></div>
                <div className="ham ham--2"></div>
                <div className="ham ham--3"></div>
            </button>

            <nav className={menuToggle ? "site__menu site__menu--open" : "site__menu site__menu--closed"}>
                {data && data.me && data.me.permissions.includes('ADMIN') &&
                    <Link href="/admin"><a className="menu-link__admin">admin</a></Link>
                }
                {data && data.me && !error && !loading &&
                    <CurrentItemsAndVotes />
                }
                {!error && !loading && !data.me && <Link href="/howitworks"><a className="menu__item">how it works</a></Link>}
                <UploadButton />
                {!error && !loading && 
                    <>
                        {!data.me && (
                            <Link href="/login">
                                <a className="login__button">log in</a>
                            </Link>
                        )}
                        {data && data.me && <Logout />}
                    </>
                }
            </nav>
        </>
    );
}

export default Nav;