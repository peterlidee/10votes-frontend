import { Query } from "react-apollo";
import gql from 'graphql-tag';
import Link from 'next/link';

import Error from './Error';
import Title from './Title';
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
        }
    }
`;

class SingleItem extends React.Component{
    render(){
        return(
            <Query query={ SINGLE_ITEM_QUERY } variables={{ itemId: this.props.id }}>
                {( { error, loading, data } ) => {

                    if(loading) return <p>...loading</p>
                    if(error) return <Error error={error} />
                    if(!data.item) return <p>Uhm, something went wrong. Try again?</p>
                    const {item} = data;

                    // construct a string we will use as title and alt: "Image in {location} {tags}"
                    const tagsString = item.tags ? item.tags.map(tag => `#${tag.name}`).join(" ") : '';
                    const description = `Image in ${item.location.name} ${tagsString}`;

                    return(
                        <div>
                            <Title>{description}</Title>
                            <img src={item.largeImage} alt={description} width="150" />
                            <div>
                                location: 
                                <Link 
                                    href="/location/[countryCode]/[place]" 
                                    as={`/location/${data.item.location.country.countryCode}/${data.item.location.slug}`}
                                >
                                    <a>{item.location.name} - {item.location.country.name}</a>
                                </Link>
                            </div>
                            {item.tags.length > 0 &&
                                <div>
                                    tags:
                                    {item.tags.map(tag => (
                                        <Link 
                                            href="/tags/[tagslug]"
                                            as={`/tags/${tag.slug}`}
                                            key={tag.id}
                                        >
                                            <a>#{tag.name}</a>
                                        </Link>                                    
                                    ))}
                                </div>
                            }
                            <Voting currentItemId={item.id} />
                        </div>
                    )
                }}
            </Query>
        );
    }
}

export default SingleItem;