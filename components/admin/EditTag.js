import Link from 'next/link';
import PropTypes from 'prop-types';

import SingleTaxonomyAdmin from '../taxonomy/SingleTaxonomyAdmin'
import EditHeader from './EditHeader'
import GetItemsCount from '../items/GetItemsCount'
import TaxonomySummary from './TaxonomySummary'

const EditTag = (props) => ( // props: tagId and type (locations, tags, users)
    <SingleTaxonomyAdmin {...props}>
        {( data ) => {
            console.log('data',data)
            return(
                <>
                    <EditHeader type={props.type} data={data} />
                    <section className="admin__taxonomy-sections-grid admin__taxonomy-sections-grid--tags">
                        {/*<div className="admin__taxonomy-section">
                            <h3 className="admin__taxonomy-section__title">summary</h3>
                            <div className="taxonomy-summary">
                                <div className="taxonomy-summary__label">tag name:</div>
                                <div>#{data.tag.name}</div>
                                <Link href={`/tag/${data.tag.slug}`}>
                                    <a className="taxonomy-summary__label taxonomy-summary__link">items with tag: </a>
                                </Link>
                                <GetItemsCount type={props.type} data={data}>
                                    {({ data: countData }) => (
                                        <div className="taxonomy-summary__count">{countData.itemsConnection.aggregate.count}</div>
                                    )}
                                </GetItemsCount>
                            </div>
                             
                        </div>*/}
                        <TaxonomySummary type={props.type} data={data} />
                        <div className="admin__taxonomy-section">
                            <h3 className="admin__taxonomy-section__title">change or merge</h3>
                            <p>Removes old tag and updates all items with the new or already existing tag.</p>
                        </div>
                        <div className="admin__taxonomy-section">
                            <h3 className="admin__taxonomy-section__title">delete</h3>
                            <p>The tag is removed from database and from all items.</p>
                            <div><button>delete</button></div>
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