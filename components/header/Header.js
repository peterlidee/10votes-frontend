import Link from 'next/link';

import Nav from './Nav';

// this prevents an issue with different ids on the server and client on the downshift useCombobox element
// https://github.com/vercel/next.js/issues/12863#issuecomment-628660240
import dynamic from "next/dynamic";
const Search = dynamic(
    () => import('./Search'),
    { ssr: false }
)

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
        <Search />
        <Nav />
    </header>
);

export default Header;