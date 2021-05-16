import Router from 'next/router'

import { useMutation } from '@apollo/client'
import { DELETE_TAG_MUTATION } from '../../queriesAndMutations/tags/tagMutations'

import FormRow from '../formParts/FormRow'
import FormButton from '../formParts/FormButton'
import Error from '../snippets/Error'

import PropTypes from 'prop-types'

const DeleteTag = (props) => {

    const [ deleteTag, { loading, error } ] = useMutation(DELETE_TAG_MUTATION, { 
        variables: { tagId: props.tagId },
    });

    const handleDelete = (e) => {
        // prevent form submit
        e.preventDefault();

        if(confirm('Are you sure you want to delete this tag?')){
            deleteTag()
                .then(res => {
                    // delete tag was succesfull
                    if(res.data.deleteTag){
                        // redirect
                        Router.push('/admin');
                    }
                })
                .catch(error => console.error('deleteTag error', error, error.message));
        }
    }

    return(
        <div className="admin-section">
            <h2 className="item-crud__title title">Delete</h2>
            <p className="crud-message">Remove the tag from database and from all items.</p>
            <form 
                onSubmit={handleDelete} 
                className="form-part"
            >
                {error && (
                    <FormRow valid={{ error: true, form: false }}>
                        <Error error={error} plain={true} />
                    </FormRow>
                )}

                <FormRow 
                    number={1}
                    extraClass="last" 
                    valid={{ 
                        field: true, 
                        form: true,
                    }}
                >
                    <FormButton loading={loading} formValid={false}>delete</FormButton>
                </FormRow>

            </form>
        </div>
    )
}

DeleteTag.propTypes = {
    tagId: PropTypes.string.isRequired,
};

export default DeleteTag;