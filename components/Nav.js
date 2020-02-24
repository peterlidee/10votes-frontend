import Link from 'next/link';

const Nav = props => (
    <div>
        <Link href="/">
            <a>home</a>
        </Link>
        <Link href="/items">
            <a>items</a>
        </Link>
        <Link href="/sell">
            <a>sell</a>
        </Link>
        <Link href="/apage">
            <a>a page</a>
        </Link>
    </div>
);

export default Nav;