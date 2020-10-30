import PropTypes from 'prop-types';

const shapes = {}
shapes.duck = 
<g className="icon__duck">
    <circle className="icon__duck__head" cx="100" cy="100" r="85"/>
    <g className="icon__duck__eyes">
        <circle className="icon__duck__eye-left" cx="68" cy="81" r="28.5" fill="#fff"/>
        <circle className="icon__duck__eye-right" cx="132" cy="81" r="28.5" fill="#fff"/>
    </g>
    <g className="icon__duck__beak">
        <rect className="icon__duck__beak-up" x="67" y="118" width="66" height="10" fill="#fff"/>
        <rect className="icon__duck__beak-down" x="67" y="132" width="66" height="10" fill="#fff"/>
    </g>
</g>;

shapes.thief = 
<g className="icon__thief">
    <circle className="icon__thief__head" cx="100" cy="100" r="85"/>
    <g className="icon__thief__eyes" fill="#fff">
        <path d="M97.5,79.31s-4.78,25.29-24.23,26.62S36.42,87.63,32.5,66C43.93,68.33,97.5,79.31,97.5,79.31Z" />
        <path d="M102.5,79.31s4.78,25.29,24.23,26.62S163.58,87.63,167.5,66C156.07,68.33,102.5,79.31,102.5,79.31Z" />
    </g>
    <polygon className="icon__thief__stolen-pic" points="119.97 190 45.69 179.1 74.35 129.47 134.78 164.35 119.97 190" fill="#fff"/>
</g>;

shapes.noText = 
<g className="icon__noText">
    <polygon className="icon__noText__landscape" points="168.33 166 128.33 187.67 65.06 187.67 31 165.67 19.46 153.4 50.78 138.37 86.57 147.88 140.26 109.3 185 136.86 168.33 166"/>
    <circle className="icon__noText__sun" cx="65" cy="63" r="32" />
    <text transform="translate(22 126)" fill="#fff" stroke="#000" strokeWidth="3" className="icon__noText__text">####</text>
</g>;

const IconRules = props => (
    <svg version="1.1"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" className="icon__rules">
        {shapes[props.shape]}
        <g className="forbidden-sign">
            <path className="forbidden-spacing" d="M190,100A90,90,0,0,0,43.83,29.69L38.9,24.76,24.76,38.9l4.92,4.92A90,90,0,0,0,156.17,170.31l5.26,5.26,14.14-14.14-5.26-5.26A89.61,89.61,0,0,0,190,100ZM100,15a85,85,0,0,1,66.74,137.6L47.4,33.26A84.61,84.61,0,0,1,100,15Zm0,170A85,85,0,0,1,33.26,47.4L60.59,74.73l92,92A84.61,84.61,0,0,1,100,185Z" fill="#fff"/>
            <path className="forbidden" d="M100,0A100,100,0,1,0,200,100,100,100,0,0,0,100,0Zm90,100a89.66,89.66,0,0,1-22.93,60L40,32.93A90,90,0,0,1,190,100ZM10,100A89.66,89.66,0,0,1,32.93,40L160,167.07A90,90,0,0,1,10,100Z" fill="#f00"/>
        </g>
    </svg>
);

IconRules.propTypes = {
    shape: PropTypes.string.isRequired,
};

export default IconRules;