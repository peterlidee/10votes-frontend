import Nav from './Nav';

const Header = props => (
    <div>
        <div className="bar">
            <p>I'm the header</p>
            <a href='#'>logo</a>
            <Nav />
        </div>
        
    </div>
);

export default Header;