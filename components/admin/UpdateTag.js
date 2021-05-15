import Router from 'next/router'

import { useMutation } from '@apollo/client'
import { DELETE_TAG_MUTATION } from '../../queriesAndMutations/tags/tagMutations'

import FormRow from '../formParts/FormRow'
import FormButton from '../formParts/FormButton'
import Error from '../snippets/Error'

import PropTypes from 'prop-types'

const UpdateTag = (props) => {
    const handleUpdate = () => {
        console.log('updating',)
    }
    const error = undefined
    const loading = false
    return(
        <div className="admin__taxonomy-section">
            <h3 className="admin__taxonomy-section__title">Update</h3>
            <p>Removes old tag and updates all items with the new or already existing tag.</p>
            <form 
                onSubmit={handleUpdate} 
                className="form-part"
            >
                <FormRow 
                    number={1}
                    valid={{ 
                        field: true, 
                        form: true,
                    }}
                >
                    <div className="crud-message">Enter a new tag or select an existing one.</div>
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
                        field: true, 
                        form: true,
                    }}
                >
                    <FormButton loading={loading} formValid={false}>update</FormButton>
                </FormRow>

            </form>
        </div>
    )
}

export default UpdateTag;