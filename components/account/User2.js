//import { Query } from 'react-apollo';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
// import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const CURRENT_USER_QUERY = gql`
    query {
        me {
            id
            email
        }
    }
`;

const GET_TAG = gql`
    query GET_TAG($name: String!){
        tag( name: $name ){
            id
            name
        }
    }
`;

const User = props => (
    <Query 
        {...props} 
        query={CURRENT_USER_QUERY} 
        variables={{ name: "test" }}
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

const User2 = props => (
    <Query
        {...props}
        query={GET_TAG} 
        variables={{ name: "test" }}
        fetchPolicy="cache-and-network"
    >
        {payload => props.children(payload)}
    </Query>
);


// User.propTypes = {
//     children: PropTypes.func.isRequired
// };

export default User2;
export { CURRENT_USER_QUERY };