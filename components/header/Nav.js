import Link from 'next/link';
import User from '../account/User';
import Logout from '../account/Logout';
import MenuContext from './MenuContext';

import IconUpload from './IconUpload';

const Nav = () => (
    <MenuContext.Consumer>
        {({menuOpen, toggleMenu}) => (
            <>
                <button className={menuOpen ? "menu-toggle__button menu-toggle__button--open" : "menu-toggle__button menu-toggle__button--close"} onClick={toggleMenu}>
                    <div className="ham ham--1"></div>
                    <div className="ham ham--2"></div>
                    <div className="ham ham--3"></div>
                </button>

                <nav className={menuOpen ? "site__menu site__menu--open" : "site__menu site__menu--closed"}>

                    <User>
                        {({ loading, error, data }) => {
                            
                            if(loading || (!loading && !data) || error) return null;
                            const { me } = data;

                            return(
                                <>
                                    {(me) && (
                                        <>
                                            <Link href="/myvotes">
                                                <a className="mymenu myvotes">
                                                    <span className="mymenu__label">my votes</span>
                                                    <span className="mymenu__number">{me.votes.length}</span>
                                                </a>
                                            </Link>
                                            <Link href="/myitems">
                                                <a className="mymenu myitems">
                                                    <span className="mymenu__label">my pics</span>
                                                    <span className="mymenu__number">{me.items.length}</span>
                                                </a>
                                            </Link>
                                        </>
                                    )}
                                </>
                            )
                        }}
                    </User>

                    <Link href="/addapicture">
                        <a className="upload">
                            <IconUpload />
                            <span className="upload__label">upload</span>
                        </a>
                    </Link>

                    <User>
                        {({ loading, error, data }) => {
                            
                            if(loading || (!loading && !data) || error) return null;
                            const { me } = data;

                            return(
                                <>
                                    {(me) && (
                                        <Logout />
                                    )}
                                    {(!me) && (
                                        <Link href="/login">
                                            <a className="login__button">log in</a>
                                        </Link>
                                    )}
                                </>
                            )
                        }}
                    </User>

                </nav>
            </>
            )
        }
    </MenuContext.Consumer>
)

export default Nav;