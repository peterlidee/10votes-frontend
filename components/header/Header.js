import Link from 'next/link';

import ProgressBar from './ProgressBar';
import Nav from './Nav';
import Search from './Search';

const Header = props => (
    <>
        <ProgressBar />
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
    </>
);

export default Header;