import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const CURRENT_USER_QUERY = gql`
    query {
        me {
            id
            email
        }
    }
`;

const User = props => (
    <Query 
        {...props} 
        query={CURRENT_USER_QUERY} 
        //fetchPolicy="cache-and-network"
    >
        {({ loading, error, data }) => {
            if(error) return <p>Error</p>
            if(loading) return <p>loading</p>
            if(!data) return <p>no data</p>
            if(!data.me) return <p>no data</p>
            console.log('data', data)
            return <p>Hello from inside user data.</p>
        }}
    </Query>
);

User.propTypes = {
    children: PropTypes.func.isRequired
};

export default User;
export { CURRENT_USER_QUERY };