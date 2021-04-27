import { gql } from '@apollo/client';

// used by /tags/tagname and /admin/tags/tagname
const SINGLE_TAG_QUERY = gql`
    query($tagSlug: String!){
        tag( tagSlug: $tagSlug ){
            id
            name
            slug
        }
    }
`;

export {
    SINGLE_TAG_QUERY
};