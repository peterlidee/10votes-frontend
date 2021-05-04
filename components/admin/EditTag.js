import PropTypes from 'prop-types';
import SingleTaxonomyQuery from './SingleTaxonomyQuery';

const EditTag = (props) => ( // props: tagId and type (locations, tags, users)
    <SingleTaxonomyQuery {...props}>
        {(data) => {
            console.log('data',data)
            return(
                <div>
                    hello, i'm the {props.type.slice(0,-1)}: {data[props.type.slice(0,-1)].name}
                </div>
            )
        }}
    </SingleTaxonomyQuery>
)

EditTag.propTypes = {
    tagId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default EditTag;