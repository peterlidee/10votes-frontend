//import { Mutation } from 'react-apollo';
//import gql from 'graphql-tag';

import { USER_LOGGED_IN_QUERY } from '../account/User';
import Error from '../snippets/Error';

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!){
        deleteItem(id: $id){
            id
        }
    }
`;

const DeleteMyItem = (props) => (
    <Mutation 
        mutation={DELETE_ITEM_MUTATION} 
        variables={{ id: props.id }} 
        refetchQueries={[{ query: USER_LOGGED_IN_QUERY }]}>
            {(deleteItem, { error }) => (
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
            )}
    </Mutation>
);

export default DeleteMyItem;