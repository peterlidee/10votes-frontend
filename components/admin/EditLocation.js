import PropTypes from 'prop-types'
import SingleTaxonomyAdmin from '../taxonomy/SingleTaxonomyAdmin'
import EditHeader from './EditHeader'

const EditLocation = (props) => ( // props: locationId and type (locations, tags, users)
    <SingleTaxonomyAdmin {...props}>
        {(data) => {
            console.log('data',data)
            return(
                <>
                    <EditHeader type={props.type} data={data} />
                    hello, i'm the {props.type.slice(0,-1)}: {data[props.type.slice(0,-1)].name}
                </>
            )
        }}
    </SingleTaxonomyAdmin>
)

EditLocation.propTypes = {
    locationId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default EditLocation;