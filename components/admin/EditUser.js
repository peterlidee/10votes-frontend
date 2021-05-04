import PropTypes from 'prop-types';
import SingleTaxonomyQuery from './SingleTaxonomyQuery';

const EditUser = (props) => ( // props: userId and type (locations, tags, users)
    <SingleTaxonomyQuery {...props}>
        {(data) => {
            console.log('data',data)
            return(
                <div>
                    hello, i'm the {props.type.slice(0,-1)}: {data[props.type.slice(0,-1)]?.name || data[props.type.slice(0,-1)]?.id}
                </div>
            )
        }}
    </SingleTaxonomyQuery>
)

EditUser.propTypes = {
    userId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default EditUser;