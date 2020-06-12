import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { CURRENT_USER_QUERY } from '../account/User';
import Error from '../Error';

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
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
            {(deleteItem, { error }) => (
                <>
                    <Error error={error} />
                    <button onClick={() => {
                        if(confirm('Are you sure you want to delete this item?')){
                            //deleteItem().catch(error => alert(error.message));
                            deleteItem();
                        }
                    }}>
                        {props.children}
                    </button>
                </>
            )}
    </Mutation>
);

export default DeleteMyItem;