// this component return a button and a loader element
// it takes as props: loading and formValid

import Loader from '../snippets/Loader';
import PropTypes from 'prop-types';

const FormButton = props => (
    <>
        <button  
            disabled={props.loading || props.formValid}
            type="submit" 
            className="form-part__button"
        >
            {props.children}
        </button>
        {props.loading && <Loader containerClass="form-part__loader" />}
    </>
)

FormButton.propTypes = {
    loading: PropTypes.bool.isRequired,
    formValid: PropTypes.bool.isRequired,
};

export default FormButton;