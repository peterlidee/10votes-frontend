import Router from 'next/router'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_TAG_MUTATION } from '../../queriesAndMutations/tags/tagMutations'
import { UPDATE_LOCATION_MUTATION } from '../../queriesAndMutations/locations/locationMutations'
import PropTypes from 'prop-types'
import capitalizeString from '../../lib/capitalizeString'

import FormRow from '../formParts/FormRow'
import FormButton from '../formParts/FormButton'
import Error from '../snippets/Error'
import InputSuggestion from '../item/InputSuggestion'

const query = {
    tags: UPDATE_TAG_MUTATION,
    locations: UPDATE_LOCATION_MUTATION,
}

const UpdateTag = (props) => {
    // we need variations on props.type
    const singleType = props.type.slice(0,-1);
    const capitalizedSingleType = capitalizeString(singleType);

    // init state
    const [newName, setNewName] = useState('');

    // setup mutation
    const [updateTaxonomy, {loading, error, data}] = useMutation(query[props.type], { 
        variables: {
            [`old${capitalizedSingleType}Id`]: props.id,
            [`new${capitalizedSingleType}Name`]: newName,
        }
    });

    // called on inputchange and onselect for InputSuggestion
    const handleSetState = (newState, index) => {
        setNewName(newState[props.type]);
    }

    // submit function
    const handleUpdate = (e) => {
        e.preventDefault();
        updateTaxonomy()
            .then(res => {
                // either a new tag was made or the tag was merged
                // we check this by comparing oldTagID with the id of the response
                setNewName('');
                if(props.id == res.data[`update${capitalizedSingleType}`].id){ // the id is the same, so the tag just got updated
                    // stay on the page
                    // clear out the form
                }else{
                    // the 2 tag id's don't match
                    // this means the old tag got merged into an existing in
                    // push to that existing tag page
                    Router.push(`/admin/${singleType}?id=${res.data[`update${capitalizedSingleType}`].id}`);
                }
            })
            .catch(error => console.log(error.message));
    }

    return(
        <div className="admin-section">
            <h2 className="item-crud__title title">Update</h2>
            <p className="crud-message">Enter a new {singleType} or select an existing one.</p>
            <form 
                onSubmit={handleUpdate} 
                className="form-part"
            >
                <FormRow 
                    number={1}
                    label={{ 
                        text: `Enter a ${singleType}`, 
                        required: true,
                        html: true,
                        for: `input-suggestion__${props.type}--1`,
                    }}
                    valid={{ 
                        field: newName && newName.length >= 2, 
                        form: newName && newName.length >= 2,
                    }}
                >
                    <InputSuggestion 
                        value={newName}
                        index={-1}
                        type={props.type} 
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
                        field: newName && newName.length >= 2, 
                        form: newName && newName.length >= 2,
                    }}
                >
                    <FormButton loading={loading} formValid={!Boolean(newName.length >= 2)}>update</FormButton>
                </FormRow>

            </form>
        </div>
    )
}

UpdateTag.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default UpdateTag;