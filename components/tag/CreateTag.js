import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Error from '../Error';

const CREATE_TAG_MUTATION = gql`
    mutation CREATE_TAG_MUTATION($name: String!){
        createTag(name: $name){
            name
            id
        }
    }
`;

const CreateTag = (props) => {
    return(
        <Mutation 
            mutation={CREATE_TAG_MUTATION} 
            variables={props.data}>
                {( createTag, { error, loading }) => {
                    return(
                        <div>
                            <Error error={error} />
                            <button 
                                type="button" 
                                onClick={ async (e) => {
                                    e.preventDefault();
                                    if(props.data.name.length > 2){
                                        const res = await createTag();
                                        props.handleSelect( res.data.createTag ); 
                                    }
                                }}
                                disabled={loading || props.loading}>
                                    add tag #{props.data.name}
                            </button>
                        </div>
                    );
                }}
        </Mutation>
    );
}

CreateTag.propTypes = {
    data: PropTypes.object.isRequired,
    handleSelect: PropTypes.func.isRequired,
}

export default CreateTag;