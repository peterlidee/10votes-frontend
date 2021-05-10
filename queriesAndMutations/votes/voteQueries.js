import { gql } from '@apollo/client'
import { ITEM_FIELDS_FRAGMENT } from '../fragments/itemFragment'

// query all votes from current user
const USER_VOTES_QUERY = gql`
    query{
        userVotes{
            id
            item{
                ...ItemFields
            }
        }
    }
    ${ITEM_FIELDS_FRAGMENT}
`;

export { USER_VOTES_QUERY }