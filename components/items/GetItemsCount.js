// this component return the total amount of items in tags - location - country
// this component returns render function with data (data.itemsConnection.aggregate.count)
// it requires a tagSlug or a locationSlug and or a countryCode

import { useQuery, gql } from '@apollo/client';

const TAGS_PAGINATION_QUERY = gql`
    query TAGS_PAGINATION_QUERY($tagSlug: String!){
        itemsConnection( tagSlug: $tagSlug ){
            aggregate{
                count
            }
        }
    }
`;

const LOCATION_PAGINATION_QUERY = gql`
    query LOCATION_PAGINATION_QUERY($countryCode: String!, $locationSlug: String!){
        itemsConnection( locationSlug: $locationSlug, countryCode: $countryCode ){
            aggregate{
                count
            }
        }
    }
`;

const COUNTRY_PAGINATION_QUERY = gql`
    query COUNTRY_PAGINATION_QUERY($countryCode: String!){
        itemsConnection( countryCode: $countryCode ){
            aggregate{
                count
            }
        }
    }
`;

const GetItemsCount = (props) => {
    // console.log('props from GetItemsCount',props.tagSlug)
    const variables = {}
    let query;
    if(props.type == 'tag'){
        variables.tagSlug = props.tagSlug;
        query = TAGS_PAGINATION_QUERY;
    }
    // if(props.locationSlug && props.countryCode){
    //     variables.locationSlug = props.locationSlug;
    //     variables.countryCode = props.countryCode;
    //     query = LOCATION_PAGINATION_QUERY;
    // }
    // if(!props.locationSlug && props.countryCode){
    //     variables.countryCode = props.countryCode;
    //     query = COUNTRY_PAGINATION_QUERY;
    // }
    const { loading, error, data } = useQuery(query, { variables })
    if(loading || error || !data || !data.itemsConnection) return null;    
    return props.children({data})
}

export default GetItemsCount;