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

const GET_TAG = gql`
    query GET_TAG($name: String!){
        tag(where: { name: $name }){
            id
            name
        }
    }
`;

const SEARCH_TAGS_QUERY = gql`
    query SEARCH_TAGS_QUERY($search: String!){
        tags(where: { name_contains: $search }){
            id
            name
            slug
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
        query={GET_TAG} 
        variables={{ name: "test" }}
    >
        {({ loading, error, data }) => {
            if(error) return <p>Error</p>
            if(loading) return <p>loading</p>
            if(!data) return <p>no data</p>
            if(!data.tag) return <p>no data</p>
            console.log('data', data)
            return <p>Hello from inside user data. Prop test: {props.test}</p>
        }}
    </Query>
);


User.propTypes = {
    children: PropTypes.func.isRequired
};

export default User2;
export { CURRENT_USER_QUERY };