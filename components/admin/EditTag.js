import PropTypes from 'prop-types';

import SingleTaxonomyAdmin from '../taxonomy/SingleTaxonomyAdmin'
import EditHeader from './EditHeader'
import TaxonomySummary from './TaxonomySummary'
import DeleteTag from './DeleteTag'
import UpdateTag from './UpdateTag'

// redirect, via router
// refetch single query?

const EditTag = (props) => ( // props: tagId and type (locations, tags, users)
    <SingleTaxonomyAdmin {...props}>
        {( data ) => {
            console.log('data',data)

            return(
                <>
                    <EditHeader type={props.type} data={data} />
                    <section className="admin-grid">
                        <TaxonomySummary type={props.type} data={data} />
                        

                        <UpdateTag oldTagId={data.tag.id} />

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