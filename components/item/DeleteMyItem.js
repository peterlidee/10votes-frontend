import { useMutation, gql } from '@apollo/client';
import PropTypes from 'prop-types';

import { USER_ITEMS_QUERY } from '../../queriesAndMutations/items/itemQueries'
import Error from '../snippets/Error';

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!){
        deleteItem(id: $id){
            id
        }
    }
`;

function DeleteMyItem(props){
    const [deleteItem, { error }] = useMutation(DELETE_ITEM_MUTATION, { 
        variables: { id: props.id },
        update (cache, { data }) {
            // the user just deleted one of his own items, and the useMutation returned the id of that item
            // let's update the user items query in the cache

            // get the cache of USER_ITEMS_QUERY
            const userItemsCache = cache.readQuery({
                query: USER_ITEMS_QUERY
            });

            // check if data was returned
            // and check if there is data in cache
            if(data.deleteItem && userItemsCache){
                // we update the cache by removing the item from the array
                // construct the new cache array
                const newUserItems = userItemsCache.userItems.filter(userItem => userItem.id !== data.deleteItem.id)
                // and write it
                cache.writeQuery({
                    query: USER_ITEMS_QUERY,
                    data: {
                        userItems: newUserItems
                    },
                });
            }
        }
    })
    return(
        <>
            <button className="item__delete-button" onClick={() => {
                if(confirm('Are you sure you want to delete this item?')){
                    deleteItem().catch(error => console.error(error.message));
                }
            }}>
                {props.children}
            </button>
            {error && <Error error={error} />}
        </>
    );
}

DeleteMyItem.propTypes = {
    id: PropTypes.string.isRequired,
};

export default DeleteMyItem;