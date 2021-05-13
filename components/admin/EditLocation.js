import PropTypes from 'prop-types'
import SingleTaxonomyAdmin from '../taxonomy/SingleTaxonomyAdmin'
import EditHeader from './EditHeader'
import TaxonomySummary from './TaxonomySummary'

const EditLocation = (props) => ( // props: locationId and type (locations, tags, users)
    <SingleTaxonomyAdmin {...props}>
        {(data) => {
            console.log('data',data)
            return(
                <>
                    <EditHeader type={props.type} data={data} />
                    <section className="admin__taxonomy-sections-grid admin__taxonomy-sections-grid--tags">
                        <TaxonomySummary type={props.type} data={data} />
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