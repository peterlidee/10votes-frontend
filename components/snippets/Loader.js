import PropTypes from 'prop-types';

const Loader = props => (
    <div className={`loader__container ${props.containerClass}`}>
        <div className="loader" />
    </div>
);

Loader.propTypes = {
    containerClass: PropTypes.string.isRequired,
}

export default Loader;