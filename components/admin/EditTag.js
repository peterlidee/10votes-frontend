import Link from 'next/link';
import PropTypes from 'prop-types';

import SingleTaxonomyAdmin from '../taxonomy/SingleTaxonomyAdmin'
import MetaTitle from '../snippets/MetaTitle'

const EditTag = (props) => ( // props: tagId and type (locations, tags, users)
    <SingleTaxonomyAdmin {...props}>
        {({ tag }) => {
            console.log('data',tag)
            return(
                <>
                    <MetaTitle>{"Edit tag #" + tag.name}</MetaTitle>
                    <div className="admin-dashboard__taxonomy-header"> 
                        <span className="admin-dashboard__taxonomy-header__description">edit tag</span>
                        <h1 className="title title--large title--admin admin-dashboard__taxonomy-title">#{tag.name}</h1>
                        <Link href="/admin" >
                            <a className="admin-dashboard__taxonomy-header__link">&lt; back to admin</a>
                        </Link>
                    </div>

                    <section className="admin-dashboard__taxonomy admin-dashboard__taxonomy--tags">
                        <div className="admin-dashboard__section">
                            tag summary
                            tag: 
                            <Link href={`/tag/${tag.slug}`}><a>items with tag</a></Link> {tag.name}: 
                        </div>
                        <div className="admin-dashboard__section">
                            change to a new tag or merge with existing tag
                            (items with this tag will have the old tag removed and a new tag added, the old tag itself will be deleted.)
                        </div>
                        <div className="admin-dashboard__section">
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