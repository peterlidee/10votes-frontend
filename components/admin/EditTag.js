import SingleTaxonomyAdmin from '../taxonomy/SingleTaxonomyAdmin'
import EditHeader from './EditHeader'
import TaxonomySummary from './TaxonomySummary'
import DeleteTaxonomy from './DeleteTaxonomy'
import UpdateTag from './UpdateTag'
import PropTypes from 'prop-types'

const EditTag = (props) => ( // props: tagId and type (locations, tags, users)
    <SingleTaxonomyAdmin {...props}>
        {( data ) => (
            <>
                <EditHeader type={props.type} data={data} />
                <section className="admin-grid">
                    <TaxonomySummary type={props.type} data={data} />
                    <UpdateTag oldTagId={data.tag.id} />
                    <DeleteTaxonomy id={data.tag.id} type="tags" />
                </section>
            </>
        )}
    </SingleTaxonomyAdmin>
)

EditTag.propTypes = {
    tagId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default EditTag;