import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './Error';
import PropTypes from 'prop-types';

const ALL_USERS_QUERY = gql`
    query ALL_USERS_QUERY{
        users{
            id
            email
            permissions
        }
    }
`;

const UPDATE_PERMISSIONS_MUTATION = gql`
    mutation UPDATE_PERMISSIONS_MUTATION($permissions: [Permission], $userId: ID!){
        updatePermissions(permissions: $permissions , userId: $userId){
            id
            permissions
            name
            email
        }
    }
`;

const possiblePermissions = [
    'ADMIN',
    'USER',
    'ITEMCREATE',
    'ITEMUPDATE',
    'ITEMDELETE',
    'PERMISSIONUPDATE'
];

const Permissions = props => (
    <Query query={ALL_USERS_QUERY}>
        {({data, loading, error}) => (
            <div>
                <Error error={error} />
                <div>
                    <h1>Manage permissions</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>email</th>
                                {possiblePermissions.map(permission => <th key={permission}>{permission}</th>)}
                                <th>↓</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.users.map(user => (
                                <Userpermissions user={user} key={user.id} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
    </Query>
);

class Userpermissions extends React.Component{
    static propTypes = {
        user: PropTypes.shape({
            //name: PropTypes.string,
            email: PropTypes.string,
            id: PropTypes.string,
            permissions: PropTypes.array,
        }).isRequired,
    }
    state = {
        permissions: this.props.user.permissions
    }
    handlePermissionChange = e => {
        const checkbox = e.target;
        //take a copy of the current permissions from state
        let updatedPermissions = [...this.state.permissions];
        // figure out if we need to remove or add permissions
        if(checkbox.checked){
            // add it in
            updatedPermissions.push(checkbox.value);
        }else{
            updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value);
        }
        this.setState({
            permissions: updatedPermissions
        })
    }
    
    render(){
        const user = this.props.user;
        return(
            <Mutation 
                mutation={UPDATE_PERMISSIONS_MUTATION} 
                variables={{ permissions: this.state.permissions, userId: this.props.user.id }}>
                    {( updatePermissions, {loading, error} ) => (
                        <>
                            {error && <tr><td colSpan="8"><Error error={error} /></td></tr>}
                            <tr>
                                {/*<td>{user.name}</td>*/}
                                <td>{user.email}</td>
                                {possiblePermissions.map(permission => (
                                    <td key={permission}>
                                        <label htmlFor={`${user.id}-permission-${permission}`}>
                                            <input 
                                                type="checkbox" 
                                                checked={this.state.permissions.includes(permission)} 
                                                id={`${user.id}-permission-${permission}`}
                                                value={permission}
                                                onChange={this.handlePermissionChange} />
                                        </label>
                                    </td>
                                ))}
                                <td>
                                <button type="button" onClick={updatePermissions} disabled={loading}>updat{loading ? "ing" : "e"}</button>
                                </td>
                            </tr>
                        </>
                    )}
            </Mutation>
        );
    }
}

export default Permissions;