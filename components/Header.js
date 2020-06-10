import Nav from './Nav';
import Search from './Search';

const Header = props => (
    <div>
        <div className="bar">
            <p>I'm the header</p>
            {/*<a href='#'>logo</a>*/}
            <Nav />
        </div>
        <div className="search">
            <Search />
        </div>
    </div>
);

export default Header;