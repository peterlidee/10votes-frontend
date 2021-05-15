import PropTypes from 'prop-types';

import SingleTaxonomyAdmin from '../taxonomy/SingleTaxonomyAdmin'
import EditHeader from './EditHeader'
import TaxonomySummary from './TaxonomySummary'
import DeleteTag from './DeleteTag'

// redirect, via router
// refetch single query?

const EditTag = (props) => ( // props: tagId and type (locations, tags, users)
    <SingleTaxonomyAdmin {...props}>
        {( data ) => {
            console.log('data',data)

            return(
                <>
                    <EditHeader type={props.type} data={data} />
                    <section className="admin__taxonomy-sections-grid admin__taxonomy-sections-grid--tags">
                        <TaxonomySummary type={props.type} data={data} />
                        <div className="admin__taxonomy-section">
                            <h3 className="admin__taxonomy-section__title">change or merge</h3>
                            <p>Removes old tag and updates all items with the new or already existing tag.</p>
                        </div>

                        <DeleteTag tagId={data.tag.id} />

                    </section>
                </>
            )
        }}
    </SingleTaxonomyAdmin>
)

EditTag.propTypes = {
    tagId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default EditTag;