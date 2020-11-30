import Link from 'next/link';

import Nav from './Nav';
//import Search from './Search';

// progressbar config
import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => {
    NProgress.start();
}
Router.onRouteChangeComplete = () => {
    NProgress.done();
}
Router.onRouteChangeError = () => {
    NProgress.done();
}

const Header = props => (
    <header className="site__header">
        <Link href="/">
            <a className="logo">
                <span className="logo__number">10</span>
                <span className="logo__label">votes</span>
            </a>
        </Link>
        {/*
        <Search />
        */}
        <Nav />
    </header>
);

export default Header;