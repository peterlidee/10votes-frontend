import PropTypes from 'prop-types';

const ItemSelect = (props) => (
    <label htmlFor={props.id}>
        <input type="checkbox" name={props.name} id={props.id} onChange={props.handleSelect} checked={props.checked} />
        {props.name}
    </label> 
);

ItemSelect.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    handleSelect: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
}

export default ItemSelect;