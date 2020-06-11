import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items';
import { CURRENT_USER_QUERY } from './account/User';

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!){
        deleteItem(id: $id){
            id
        }
    }
`;

class DeleteItem extends React.Component{

    update = (cache, payload) => {
        // manually update the cache on the client, so it matches the server
        // 1. Read the cache for the items we want
        const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
        //console.log(data, payload);
        // 2. Filter the deleted item out of the page
        //data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
        const newData = {};
        newData.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
        // 3. Put the items back!
        cache.writeQuery({ query: ALL_ITEMS_QUERY, data: newData });
    };

    render(){
        return(
            <Mutation
                mutation={DELETE_ITEM_MUTATION}
                variables={{ id: this.props.id }}
                refetchQueries={[{query: CURRENT_USER_QUERY}]}
                update={this.update}
                >
                {(deleteItem, { error }) => (
                <button 
                    onClick={() => {
                        if (confirm('Are you sure you want to delete this item?')) {
                            deleteItem().catch(error => alert(error.message));
                        }
                    }}
                >
                    {this.props.children}
                </button>
                )}
            </Mutation>
        )
    }
}

export default DeleteItem;