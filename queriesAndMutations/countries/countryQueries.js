import { gql } from '@apollo/client';

const SINGLE_COUNTRY_QUERY = gql`
    query ($countryCode: String, $countryId: ID){
        country( countryCode: $countryCode, countryId: $countryId ){
            id
            name
            countryCode
        }
    }
`;

export { SINGLE_COUNTRY_QUERY }