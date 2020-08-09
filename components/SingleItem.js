import { Query } from "react-apollo";
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';

import Loader from './snippets/Loader';
import NewError from './NewError';
import MetaTitle from './snippets/MetaTitle';
import Voting from './voting/Voting';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($itemId: ID!){
        item(where : {id: $itemId}){
            id
            largeImage
            location{
                id
                name
                slug
                country{
                    id
                    name
                    countryCode
                }
            }
            tags{
                name
                id
                slug
            }
            voteCount
        }
    }
`;

const SingleItem  = props => (
    <div className="grid-single-item">
        <Query query={ SINGLE_ITEM_QUERY } variables={{ itemId: props.id }}>
            {( { error, loading, data } ) => {

                if(loading) return <Loader containerClass="items-loader" />
                if(error) return <NewError error={error} />
                if(!data || !data.item) return <p className="no-data">Uhm, something went wrong. Try again?</p>
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
                                            <Link key={tag.id} href="/tags/[tagslug]" as={`/tags/${tag.slug}`}>
                                                <a className="item__tag item__tag--tag">{tag.name}</a>
                                            </Link>
                                        ))}
                                    </> 
                                }
                            </div>
                            <div className="item__votes">
                                <div className="item__votes__number">{item.voteCount}</div>
                                <div className="item__votes__label">votes</div>
                            </div>
                            <Voting currentItemId={item.id} />
                        </div>
                    </article>
                )
            }}
        </Query>
    </div>
);

SingleItem.propTypes = {
    id: PropTypes.string.isRequired,
};

export default SingleItem;