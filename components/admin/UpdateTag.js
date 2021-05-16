import Router from 'next/router'

import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_TAG_MUTATION } from '../../queriesAndMutations/tags/tagMutations'

import FormRow from '../formParts/FormRow'
import FormButton from '../formParts/FormButton'
import Error from '../snippets/Error'
import InputSuggestion from '../item/InputSuggestion'

import PropTypes from 'prop-types'

const UpdateTag = (props) => {
    // init state
    const [newTagName, setNewTagName] = useState('');
    const [succesMessage, setSuccesMessage] = useState('');
    // setup mutation
    const [updateTag, {loading, error, data}] = useMutation(UPDATE_TAG_MUTATION, { 
        variables: {
            oldTagId: props.oldTagId,
            newTagName: newTagName,
        }
    });

    // called on inputchange and onselect for InputSuggestion
    const handleSetState = (newState, index) => {
        setNewTagName(newState.tags);
    }

    // submit function
    const handleUpdate = (e) => {
        e.preventDefault();
        updateTag()
            .then(res => {
                // either a new tag was made or the tag was merged
                // we check this by comparing oldTagID with the id of the response
                console.log('res',res)
                setNewTagName('');
                if(props.oldTagId == res.data.updateTag.id){ // the id is the same, so the tag just got updated
                    // stay on the page
                    // set a message, updated succesfully
                    // refetch?
                    // clear out the form
                    setSuccesMessage('The tag was updated.')
                }else{
                    // the 2 tag id's don't match
                    // this means the old tag got merged into an existing in
                    // push to that existing tag page
                    Router.push(`/admin/tag?id=${res.data.updateTag.id}`);
                }
            })
            .catch(error => console.log(error.message));
    }

    return(
        <div className="admin-section">
            <h2 className="item-crud__title title">Update</h2>
            <p className="crud-message">Enter a new tag or select an existing one.</p>
            <form 
                onSubmit={handleUpdate} 
                className="form-part"
            >
                <FormRow 
                    number={1}
                    label={{ 
                        text: "Enter a tag", 
                        required: true,
                        html: true,
                        for: "input-suggestion__locations--1", // ??
                    }}
                    valid={{ 
                        field: newTagName && newTagName.length >= 2, 
                        form: newTagName && newTagName.length >= 2,
                    }}
                >
                    <InputSuggestion 
                        value={newTagName}
                        index={-1}
                        type="tags" 
                        required={true} 
                        handleSetState={handleSetState} 
                        handleSelection={handleSetState} />

                </FormRow>

                {error && (
                    <FormRow valid={{ error: true, form: false }}>
                        <Error error={error} plain={true} />
                    </FormRow>
                )}

                <FormRow 
                    number={2}
                    extraClass="last" 
                    valid={{ 
                        field: newTagName && newTagName.length >= 2, 
                        form: newTagName && newTagName.length >= 2,
                    }}
                >
                    <FormButton loading={loading} formValid={!Boolean(newTagName.length >= 2)}>update</FormButton>
                </FormRow>

            </form>

            {succesMessage && <p className="succes-message">{succesMessage} &times;</p>}

        </div>
    )
}

UpdateTag.propTypes = {
    oldTagId: PropTypes.string.isRequired,
};

export default UpdateTag;