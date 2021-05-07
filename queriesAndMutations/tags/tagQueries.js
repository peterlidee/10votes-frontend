import { gql } from '@apollo/client';

// used by /tag/tagslug and /admin/tag/tagid
const SINGLE_TAG_QUERY = gql`
    query($tagSlug: String, $tagId: ID){
        tag( tagSlug: $tagSlug, tagId: $tagId ){
            id
            name
            slug
        }
    }
`;

// used by search and inputsuggestion
const TAGS_QUERY = gql`
    query($nameContains: String!){
        tags( nameContains: $nameContains ){
            id
            name
            slug
        }
    }
`;

export {
    SINGLE_TAG_QUERY,
    TAGS_QUERY,
};