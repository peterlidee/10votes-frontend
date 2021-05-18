// used in admin sections tags, locations, users

import Router from 'next/router'
import { useMutation } from '@apollo/client'
import { DELETE_TAG_MUTATION } from '../../queriesAndMutations/tags/tagMutations'
import { DELETE_LOCATION_MUTATION } from '../../queriesAndMutations/locations/locationMutations'

import FormRow from '../formParts/FormRow'
import FormButton from '../formParts/FormButton'
import Error from '../snippets/Error'

import PropTypes from 'prop-types'
import capitalizeString from '../../lib/capitalizeString'

const query = {
    tags: DELETE_TAG_MUTATION,
    locations: DELETE_LOCATION_MUTATION,
}

const DeleteTag = (props) => {

    const [deleteTaxonomy, { loading, error }] = useMutation(query[props.type], { 
        variables: { [`${props.type.slice(0,-1)}Id`]: props.id },
    });

    const handleDelete = (e) => {
        // prevent form submit
        e.preventDefault();

        if(confirm(`Are you sure you want to delete this ${props.type.slice(0,-1)}?`)){
            deleteTaxonomy()
                .then(res => {
                    console.log('res',res)
                    // delete tag was succesfull
                    if(res.data[`delete${capitalizeString(props.type.slice(0,-1))}`]){
                        // redirect
                        Router.push('/admin');
                    }
                })
                .catch(error => console.error('deleteTaxonomy error', error.message));
        }
    }

    return(
        <div className="admin-section">
            <h2 className="item-crud__title title">Delete</h2>
            {props.type == "tags" && <p className="crud-message">Remove the tag from the database and from all items.</p>}
            {props.type == "locations" && <p className="crud-message">Remove the location from the database. You can only do this if the location has no items.</p>}
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
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default DeleteTag;