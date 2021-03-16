// this component return the total amount of items in tags - location - country
// this component returns render function with data (data.itemsConnection.aggregate.count)
// it requires a tagSlug or a locationSlug and or a countryCode

import PropTypes from 'prop-types';
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

const GetItemsCount = (props) => { // props: data and type
    const variables = {}
    let query;
    if(props.type == 'tag'){
        variables.tagSlug = props.data.tag.slug;
        query = TAGS_PAGINATION_QUERY;
    }
    if(props.type == 'location'){
        variables.locationSlug = props.data.locations[0].slug;
        variables.countryCode = props.data.locations[0].country.countryCode;
        query = LOCATION_PAGINATION_QUERY;

    }
    if(props.type == 'country'){
        variables.countryCode = props.data.country.countryCode;
        query = COUNTRY_PAGINATION_QUERY;

    }
    const { loading, error, data } = useQuery(query, { variables })
    if(loading || error || !data || !data.itemsConnection) return null;  
    return props.children({data})
}

GetItemsCount.propTypes = {
    type: PropTypes.string.isRequired, // location, country or tag
    data: PropTypes.object.isRequired
}

export default GetItemsCount;