import PropTypes from 'prop-types'
import SingleTaxonomyAdmin from '../taxonomy/SingleTaxonomyAdmin'
import EditHeader from './EditHeader'
import TaxonomySummary from './TaxonomySummary'
import UpdateTaxonomy from './UpdateTaxonomy'
import DeleteTaxonomy from './DeleteTaxonomy'

const EditLocation = (props) => ( // props: locationId and type (locations, tags, users)
    <SingleTaxonomyAdmin {...props}>
        {(data) => {
            console.log('data',data)
            return(
                <>
                    <EditHeader type={props.type} data={data} />
                    <section className="admin-grid">
                        <TaxonomySummary type={props.type} data={data} />
                        <UpdateTaxonomy type={props.type} id={data.location.id} />
                        <DeleteTaxonomy type="locations" id={props.locationId} />
                    </section>
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