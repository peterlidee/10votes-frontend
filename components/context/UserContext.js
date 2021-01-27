import { gql, useQuery } from '@apollo/client';

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

// create context with default value
const UserContext = React.createContext({
    loading: false,
    data: {},
    error: false,
})

const UserContextProvider = props => {
    const { error, data, loading } = useQuery( CURRENT_USER_QUERY, {
        fetchPolicy: "cache-and-network"
    });
    return(
        <UserContext.Provider value={{ error, loading, data }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;
export { UserContextProvider };