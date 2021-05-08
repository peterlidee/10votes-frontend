// returns image placeholder svg
// tap = is an extra class that makes the icon 'active', changes color

const IconPlaceHolder = props => (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 30" width="45" height="30" className={`icon__placeholder ${props.tap}`}>
        <polygon points="41 26 4 26 4 21 11 18 19 20 31 13 41 18 41 26" className="icon__placeholder__landscape"/>
        <circle cx="14" cy="10" r="5" className="icon__placeholder__sun"/>
        <polygon points="0,0 45,0 45,2 2,2 2,28 43,28 43,0 45,0 45,30 0,30" className="icon__placeholder__frame" />
    </svg>
);

IconPlaceHolder.defaultProps = {
    tap: ""
}

export default IconPlaceHolder;