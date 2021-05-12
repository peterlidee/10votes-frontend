import Link from 'next/link';
import PropTypes from 'prop-types';

import SingleTaxonomyAdmin from '../taxonomy/SingleTaxonomyAdmin'
import EditHeader from './EditHeader'
import GetItemsCount from '../items/GetItemsCount'

const EditTag = (props) => ( // props: tagId and type (locations, tags, users)
    <SingleTaxonomyAdmin {...props}>
        {( data ) => {
            console.log('data',data)
            return(
                <>
                    <EditHeader type={props.type} data={data} />
                    <section className="admin__taxonomy-sections admin__taxonomy-sections--tags">
                        <div className="admin__taxonomy-section">
                            summary
                            tag: #{data.tag.name}
                            tag: 
                            <Link href={`/tag/${data.tag.slug}`}><a>items with tag</a></Link> {data.tag.name}: 
                            <GetItemsCount type={props.type} data={data}>
                                {({ data: countData }) => {
                                    const count = countData.itemsConnection.aggregate.count;
                                    return(
                                        <div className="taxonomy-count">
                                            <span className="taxonomy-count__number">{count}</span>
                                            <span className="taxonomy-count__label">{count === 1 ? 'pic' : "pics"}</span>
                                        </div>
                                    )
                                }}
                            </GetItemsCount>
                        </div>
                        <div className="admin__taxonomy-section">
                            change to a new tag or merge with existing tag
                            (items with this tag will have the old tag removed and a new tag added, the old tag itself will be deleted.)
                        </div>
                        <div className="admin__taxonomy-section">
                            delete tag
                            (items with this tag will have the tag removed)
                        </div>
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