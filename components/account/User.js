import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const CURRENT_USER_QUERY = gql`
    query {
        me {
            id
            email
            permissions
            items{
                id
                image
                location{
                    id
                    name
                    slug
                    country{
                        id
                        name
                        countryCode
                    }
                }
                tags{
                    id
                    name
                    slug
                }
                voteCount
            }
            votes{
                id
                item{
                    id
                    image
                    largeImage
                    location{
                        id
                        name
                        slug
                        country{
                            id
                            name
                            countryCode
                        }
                    }
                    tags{
                        id
                        name
                        slug
                    }
                    voteCount
                }
            }
        }
    }
`;

const User = props => (
    <Query {...props} query={CURRENT_USER_QUERY}>
       {payload => props.children(payload)}
    </Query>
);

User.propTypes = {
    children: PropTypes.func.isRequired
};

export default User;
export { CURRENT_USER_QUERY };