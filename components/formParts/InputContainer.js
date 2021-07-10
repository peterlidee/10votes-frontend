// this component renders container and clear button
// you pass is an input field as props.children
// the button needs 
// 1. a clear function (f.e. () => setEmail("") )
// 2. isEmpty as props: if isEmpty, it's hidden cause there is nothing to delete

import PropTypes from 'prop-types';

const InputContainer = props => (
    <div className="input-suggestion__input-container">
        {props.children}
        <button 
            type="button" 
            className="clear-button" 
            onClick={props.clearField}
            disabled={props.isEmpty}
        >
            &times;
        </button>
    </div>
);

InputContainer.propTypes = {
    clearField: PropTypes.func.isRequired,
    isEmpty: PropTypes.bool.isRequired,
};

export default InputContainer;