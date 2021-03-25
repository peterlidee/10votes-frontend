import { useMutation, gql } from '@apollo/client';
import PropTypes from 'prop-types';

//import { USER_LOGGED_IN_QUERY } from '../account/User';
import Error from '../snippets/Error';

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!){
        deleteItem(id: $id){
            id
        }
    }
`;

function DeleteMyItem(props){
    const [deleteItem, { error }] = useMutation(DELETE_ITEM_MUTATION, { variables: { id: props.id }})
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

const DeleteMyItem2 = (props) => (
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

DeleteMyItem.propTypes = {
    id: PropTypes.string.isRequired,
};

export default DeleteMyItem;