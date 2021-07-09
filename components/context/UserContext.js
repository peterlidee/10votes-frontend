import { useQuery } from '@apollo/client';
import { USER_LOGGED_IN_QUERY } from '../../queriesAndMutations/users/userQueries'

// create context with default value
const UserContext = React.createContext({
    loading: false,
    data: {},
    error: false,
})

const UserContextProvider = props => {
    const { error, data, loading } = useQuery( USER_LOGGED_IN_QUERY, {
        fetchPolicy: "cache-and-network"
    });
    return(
        <UserContext.Provider value={{ error, loading, data }}>
            {props.children}
        </UserContext.Provider>
    )
}

// we are not gonna do SSR for USER_LOGGED_IN_QUERY cause it doesn't get cookie in middleware (backend)
// TODO: better auth ?

export default UserContext;
export { UserContextProvider };