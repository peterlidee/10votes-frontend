// this component renders container and clear button
// you pass is an input field as props.children
// the button needs a clear function, name attribute (the field it is associated with) and an isEmpty as props

import PropTypes from 'prop-types';

const InputContainer = props => (
    <div className="input-suggestion__input-container">
        {props.children}
        <button type="button" className="clear-button" onClick={() => {
            props.clearField(props.name)
        }} disabled={props.isEmpty}
        >
            &times;
        </button>
    </div>
);

InputContainer.propTypes = {
    clearField: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    isEmpty: PropTypes.bool.isRequired,
};

export default InputContainer;