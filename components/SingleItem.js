import Link from 'next/link';
import PropTypes from 'prop-types';

import { useQuery, gql } from '@apollo/client'
import { ITEM_FIELDS_FRAGMENT } from '../gqlFragments/itemFragment';

import Loader from './snippets/Loader';
import Error from './snippets/Error';
import MetaTitle from './snippets/MetaTitle';
import Voting from './voting/Voting';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($itemId: ID!){
        item( itemId: $itemId ){
            ...ItemFields
        }
    }
    ${ITEM_FIELDS_FRAGMENT}
`;

// TODO: merge with item?

function SingleItem(props){
    if(!props.itemId) return <p className="no-data">No such picture found.</p>
    const { error, loading, data } = useQuery(SINGLE_ITEM_QUERY, {
        variables: { itemId: props.itemId },
    });
    if(loading) return <Loader containerClass="items-loader" />
    if(error) return <Error error={error} />
    if(!data || !data.item) return <p className="no-data">No such picture found.</p>
    const {item} = data;

    // construct a string we will use as title and alt: "Image in {location} {tags}"
    const tagsString = item.tags ? item.tags.map(tag => `#${tag.name}`).join(" ") : '';
    const description = `Pic in ${item.location.name} ${tagsString}`;

    return(
        <article className="item item--single">
            <MetaTitle>{description}</MetaTitle>
            <img src={item.largeImage} alt={description} className="item__image item__image--large" />

            <div className="item__meta">
                <div className="item__tags">
                    {item.location && 
                        <Link 
                            href="/location/[countryCode]/[place]" 
                            as={`/location/${item.location.country.countryCode}/${item.location.slug}`}
                        >
                            <a className="item__tag item__tag--location">{item.location.name}</a>
                        </Link>
                    }
                    {item.tags.length > 0 &&
                        <>
                            {item.tags.map(tag => (
                                <Link key={tag.id} href="/tags/[tagSlug]" as={`/tags/${tag.slug}`}>
                                    <a className="item__tag item__tag--tag">{tag.name}</a>
                                </Link>
                            ))}
                        </> 
                    }
                </div>
                <div className="item__votes">
                    <div className="item__votes__number">{item.votes.length}</div>
                    <div className="item__votes__label">votes</div>
                </div>
                <Voting currentItemId={item.id} currentItemVotes={item.votes} />
            </div>
        </article>
    )
}

SingleItem.propTypes = {
    itemId: PropTypes.string.isRequired,
};

export default SingleItem;
export { SINGLE_ITEM_QUERY };