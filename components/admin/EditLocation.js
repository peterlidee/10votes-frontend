import PropTypes from 'prop-types'
import SingleTaxonomyAdmin from '../taxonomy/SingleTaxonomyAdmin'

const EditLocation = (props) => ( // props: locationId and type (locations, tags, users)
    <SingleTaxonomyAdmin {...props}>
        {(data) => {
            console.log('data',data)
            return(
                <div>
                    hello, i'm the {props.type.slice(0,-1)}: {data[props.type.slice(0,-1)].name}
                </div>
            )
        }}
    </SingleTaxonomyAdmin>
)

EditLocation.propTypes = {
    locationId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default EditLocation;