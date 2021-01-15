import PropTypes from 'prop-types';

const Error = ({ error, plain }) => {

    let errorMessage = "";

    if(error && error.message){
        errorMessage = error.message.replace('GraphQL error: ', '').replace('Network error: ', '');
    }
  
    // just in case
    if(error.networkError && error.networkError.result && error.networkError.result.errors.length){
        errorMessage = error.networkError.result.errors[0].message.replace('Network error: ', '');
    }

    if(plain) return <div className="error__message">{errorMessage}</div>

    return(
        <div className="error__container">
            <div className="error__icon">!</div>
            <div className="error__message">{errorMessage}</div>
        </div>
    )
}

Error.defaultProps = {
  plain: false
};

Error.propTypes = {
  error: PropTypes.object,
};

export default Error;