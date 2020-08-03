import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { CURRENT_USER_QUERY } from '../account/User';
import Error from '../Error';
import NewError from '../NewError';

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
                    <button className="item__delete-button" onClick={() => {
                        if(confirm('Are you sure you want to delete this item?')){
                            deleteItem().catch(error => console.error(error.message));
                        }
                    }}>
                        {props.children}
                    </button>
                    <NewError error={error} animate={true} />
                </>
            )}
    </Mutation>
);

export default DeleteMyItem;