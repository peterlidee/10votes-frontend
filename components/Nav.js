import Link from 'next/link';

const Nav = props => (
    <div>
        <Link href="/">
            <a>home</a>
        </Link>
        <Link href="/apage">
            <a>a page</a>
        </Link>
    </div>
);

export default Nav;