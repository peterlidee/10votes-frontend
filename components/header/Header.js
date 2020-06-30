import Nav from './Nav';
import Search from './Search';
import ProgressBar from './ProgressBar';

const Header = props => (
    <div>
        <ProgressBar />
        <div className="bar">
            {/*<a href='#'>logo</a>*/}
            <Nav />
        </div>
        <div className="search">
            <Search />
        </div>
    </div>
);

export default Header;