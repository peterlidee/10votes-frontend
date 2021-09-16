import { gql } from '@apollo/client'
import LOCATION_FIELDS_FRAGMENT from '../fragments/locationFragment'

// find a single location by slug or id
// used in /admin/location?id=
const SINGLE_LOCATION_QUERY = gql`
    query($locationSlug: String, $locationId: ID){
        location(locationSlug: $locationSlug, locationId: $locationId){
            ...LocationFields
        }
    }
    ${LOCATION_FIELDS_FRAGMENT}
`;

// used in /locations/[locationSlug]
// for finding a location we use locationS query, with slug as parameter
// cause that is the only way we can also give it a countrycode as param
// we then call it locations[0]

// used in <inputSuggestion>, search
// for finding locations that match search string,
// parameter is nameContains
const LOCATIONS_QUERY = gql`
    query($locationSlug: String, $countryCode: String, $nameContains: String){
        locations( locationSlug: $locationSlug, countryCode: $countryCode, nameContains: $nameContains ){
            ...LocationFields
        }
    }
    ${LOCATION_FIELDS_FRAGMENT}
`;

export {
    SINGLE_LOCATION_QUERY,
    LOCATIONS_QUERY,
};