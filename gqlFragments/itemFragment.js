import { gql } from '@apollo/client';

export const ITEM_FIELDS_FRAGMENT =  gql`
    fragment ItemFields on Item{
        id
        image
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
        votes{
            id
        }
    }
`;