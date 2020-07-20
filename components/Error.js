import PropTypes from 'prop-types';

import { TransitionGroup, CSSTransition } from 'react-transition-group';


const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;
  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return error.networkError.result.errors.map((error, i) => (
      <div classname="error" key={i}>
        <strong>Euhm?</strong>
        {error.message.replace('GraphQL error: ', '')}
      </div>
    ));
  }
  return (
    <div className="error">
      <strong>!!!</strong> {error.message.replace('GraphQL error: ', '')}
    </div>
  );
  /*return(
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        className="count test"
        classNames="count"
        key={error.message}
        appear={true}
        timeout={{ enter: 4000, exit: 4000 }}
      >
        <div className="error">
          <strong>!!!</strong> {error.message.replace('GraphQL error: ', '')}
        </div>
      </CSSTransition>
    </TransitionGroup>
  )*/
  /*return(
    <CSSTransition
        in={true}
        appear={true}
        //timeout={5000}
        classNames="error"
        unmountOnExit
      >
        <div className="error">
          <div className="error__inner">
            <strong>!!!</strong> {error.message.replace('GraphQL error: ', '')}
          </div>
        </div>
    </CSSTransition>
  )*/
};


DisplayError.defaultProps = {
  error: {},
};

DisplayError.propTypes = {
  error: PropTypes.object,
};

export default DisplayError;
