import PropTypes from 'prop-types';

const LabelAndInput = props => {
    // add a class to the label if the focus is on this element && the value is empty
    const labelFocusClass = props.value == "" ? props.focus === props.name ? "form__label--offset" : "form__label--placeholder" : "form__label--offset";
    const labelClass = props.animateLabel ? `form__label ${labelFocusClass}` : 'form__label';
    // add a class to the input if has focus or is not empty
    const inputFocusClass = props.value == "" ?  props.focus === props.name ? "form__input--active" : "" : "form__input--active";

    // these are the attributes for the input field as object cause we need to add some
    const inputAttributes = {
        type: props.type,
        id: props.name,
        name: props.name,
        value: props.value,
        onChange: props.saveToState,
        onFocus: props.focusInput,
        onBlur: props.blurInput,
        className: `form__input ${inputFocusClass}`,
        required: true
    }
    if(props.name === "password"){
        inputAttributes.minLength = 6;
    }

    return(
        <>
            <label 
                htmlFor={props.name} 
                className={labelClass}
            >
                {props.label ? props.label : props.name}
            </label>
            <input {...inputAttributes} />
        </>
    )
};

LabelAndInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    saveToState: PropTypes.func.isRequired,
    focusInput: PropTypes.func.isRequired,
    blurInput: PropTypes.func.isRequired,
    focus: PropTypes.string.isRequired,
    animateLabel: PropTypes.bool,
};

LabelAndInput.defaultProps = {
    animateLabel: true
}

export default LabelAndInput;