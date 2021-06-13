import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { USER_ITEMS_QUERY } from '../../queriesAndMutations/items/itemQueries'
import { DELETE_ITEM_MUTATION } from '../../queriesAndMutations/items/itemMutations'
import Error from '../snippets/Error';

import PropTypes from 'prop-types';

function DeleteItem(props){
    
    const router = useRouter();
    const [deleteItem, { error }] = useMutation(DELETE_ITEM_MUTATION, { 
        variables: { id: props.id },
        update (cache, { data }){

            // only update cache if it is owner deleting items
            if(!props.isAdmin){ // TODO what if owner removes his own???
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
            // if there wasn't a previous route, it will just update the current route and show an item not found
            // not perfect but it is an edge case anyway
            router.back();
        }
    })
    return(
        <>
            <button className={`item__delete-button ${props.isAdmin ? 'item__delete-button--admin' : ''}`} onClick={() => {
                if(confirm('Are you sure you want to delete this item?')){
                    deleteItem().catch(error => console.error(error.message));
                }
            }}>
                &times; delete item
            </button>
            {error && <Error error={error} />}
        </>
    );
}

DeleteItem.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
};

export default DeleteItem;