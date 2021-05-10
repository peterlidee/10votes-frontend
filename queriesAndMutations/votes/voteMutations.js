import { gql } from '@apollo/client'
import { ITEM_FIELDS_FRAGMENT } from '../fragments/itemFragment'

const VOTE_MUTATION = gql`
    mutation($itemId: ID!){
        castVote(itemId: $itemId){
            id
            item{
                ...ItemFields
            }
        }
    }
    ${ITEM_FIELDS_FRAGMENT}
`;

const DELETE_VOTE_MUTATION = gql`
    mutation(
        $voteId: ID!
        $itemId: ID!
    ){
        deleteVote(
            voteId: $voteId
            itemId: $itemId
        ){
            id
            item{
                ...ItemFields
            }
        }
    }
    ${ITEM_FIELDS_FRAGMENT}
`;

export { VOTE_MUTATION, DELETE_VOTE_MUTATION }