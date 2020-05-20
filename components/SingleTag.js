import { Query } from 'react-apollo';
import gql from 'graphql-tag';
//import Link from 'next/link';
import Error from './Error';
import Link from 'next/link';
import Item from './Item';
//import Item from './Item';
//import OrderItems from './OrderItems';
import verifyOrderParam from '../lib/verifyOrderParam';
import OrderItems from './OrderItems';

const TAG_EXISTS_QUERY = gql`
    query TAG_EXISTS_QUERY($slug: String!){
        tag(where: { slug: $slug }){
            id
        }
    }
`;

const ITEM_WITH_TAG_QUERY = gql`
    query ITEM_WITH_TAG_QUERY($slug: String!, $orderBy: ItemOrderByInput){
        items(
            where: { tags_some: { slug: $slug }},
            orderBy: $orderBy
        ){
            id
            image
            largeImage
            tags{
                id
                name
                slug
            }
            votes{
                id
            }
            voteCount
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
        }
    }
`;

const Tag = props => {
    // first check if there's such a tag
    // then call all
    return (
        <div>
            <Query query={TAG_EXISTS_QUERY} variables={{ slug: props.query.tagslug }}>
                {({data, loading, error}) => {
                    if(loading) return <p>...loading</p>
                    if(error) return <Error error={error} />
                    if(!data.tag) return <p>Hmmm, there doesn't seem to be a tag '{props.query.tagslug}' :/.</p>
                    return(
                        <div>
                            <h2>{props.query.tag}</h2>
                            <OrderItems path="/tags" query={props.query} />
                            <Query query={ITEM_WITH_TAG_QUERY} variables={{
                                slug: props.query.tagslug,
                                orderBy: verifyOrderParam(props.query.orderBy),
                            }}>
                                {({ loading, error, data }) => {
                                    if(loading) return <p>...loading</p>
                                    if(error) return <Error error={error} />
                                    //console.log("items with tag", data)
                                    if(!data.items || data.items.length == 0) return(
                                        <p>No items yet for this tag. Maybe you would like to <Link href="/sell"><a>add one?</a></Link></p>
                                    )
                                    const { items } = data;
                                    return(
                                        <div>
                                            {items.map(item => <Item item={item} key={item.id} />)}
                                        </div>
                                    )
                                }}
                            </Query>
                        </div>
                    )
                }}
            </Query>
        </div>
    );
}

export default Tag;