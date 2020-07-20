import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const NewError = ({ error }) => {

  let hasError = false;
  let errorMessage = "";

  if(error && error.message){
    hasError = true;
    errorMessage = error.message.replace('GraphQL error: ', '').replace('Network error: ', '');
  }
  
  // just in case
  if(error.networkError && error.networkError.result && error.networkError.result.errors.length){
    hasError = true;
    errorMessage = error.networkError.result.errors[0].message.replace('Network error: ', '');
  }
  
  const className = hasError ? "has-error" : "no-error";

    return(
      <TransitionGroup className="error-container">
        <CSSTransition
          unmountOnExit
          className={`error ${className}`}
          classNames="error"
          key={Math.random()}
          timeout={{ enter: 0, exit: 175 }}
        >
          <div>
            <div className="error__icon error__icon--left">!</div>
            <div className="error__inner">{errorMessage}</div>
            <div className="error__icon error__icon--right">!</div>
          </div>
        </CSSTransition>
      </TransitionGroup>
    );
}

NewError.defaultProps = {
  error: {},
};

NewError.propTypes = {
  error: PropTypes.object,
};

export default NewError;
