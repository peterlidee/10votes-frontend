import Link from 'next/link';
import User from '../account/User';
import Logout from '../account/Logout';
import MenuContext from './MenuContext';
import UploadButton from '../snippets/UploadButton';

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

                    {/*<User>
                        {({ loading, error, data }) => {
                            
                            if(loading || (!loading && !data) || error) return null;
                            const { me } = data;

                            return(
                                <>
                                    {(me) && (
                                        <>
                                            <Link href="/yourvotes">
                                                <a className="mymenu myvotes">
                                                    <span className="mymenu__label">your votes</span>
                                                    <span className="mymenu__number">{me.votes.length}</span>
                                                </a>
                                            </Link>
                                            <Link href="/youritems">
                                                <a className="mymenu myitems">
                                                    <span className="mymenu__label">your pics</span>
                                                    <span className="mymenu__number">{me.items.length}</span>
                                                </a>
                                            </Link>
                                        </>
                                    )}
                                    {(!me) && <Link href="/howitworks"><a className="menu__item">how it works</a></Link>}
                                </>
                            )
                        }}
                    </User>*/}
                    
                    <UploadButton />

                    {/*<User>
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
                    </User>*/}

                </nav>
            </>
            )
        }
    </MenuContext.Consumer>
)

export default Nav;