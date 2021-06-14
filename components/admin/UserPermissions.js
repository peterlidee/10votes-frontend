import { useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import { useMutation } from '@apollo/client';
import { UPDATE_PERMISSIONS_MUTATION } from '../../queriesAndMutations/users/userMutations';

import PropTypes from 'prop-types'

import FormRow from '../formParts/FormRow'
import FormButton from '../formParts/FormButton'
import Error from '../snippets/Error'

const UserPermissions = props => {
    const currAdminState = props.data.user.permissions.includes('ADMIN');
    // state for controlled input
    const [newAdminState, setNewAdminState] = useState(currAdminState);

    // you can't take away your own admin permissions
    const { data: userContextData } = useContext(UserContext);
    const isUserCurrAdmin = userContextData?.me?.id == props.data.user.id;

    // setup mutation
    const [updatePermissions, { loading, error }] = useMutation(UPDATE_PERMISSIONS_MUTATION, {
        variables: { admin: newAdminState, userId: props.data.user.id }
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        updatePermissions().catch(error => console.log(error.message));
    }

    return(
        <div className="admin-section">
            <h2 className="item-crud__title title">Permissions</h2>
            <form 
                onSubmit={handleUpdate} 
                className="form-part"
            >
                <FormRow 
                    number={1}
                    label={{ 
                        text: `Edit permission`, 
                        required: false,
                        html: false,
                    }}
                    valid={{ 
                        field: true, 
                        form: true,
                    }}
                >
                    <input 
                        type="checkbox" 
                        id="isadmin" 
                        style={{ marginRight: ".5em" }}
                        checked={newAdminState} 
                        onChange={() => setNewAdminState(!newAdminState)}
                        disabled={isUserCurrAdmin} />
                    <label htmlFor="isadmin">admin</label>
                    {isUserCurrAdmin && <div className="crud-message">You can't edit your own permissions.</div>}
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
                    <FormButton loading={loading} formValid={isUserCurrAdmin} isAdmin={true}>update</FormButton>
                </FormRow>
            </form>


        </div>
    )
}

UserPermissions.propTypes = {
    data: PropTypes.object.isRequired,
};

export default UserPermissions;