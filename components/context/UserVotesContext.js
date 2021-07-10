import { useQuery } from '@apollo/client'
import { USER_VOTES_QUERY } from '../../queriesAndMutations/votes/voteQueries'

// create context with default value
const UserVotesContext = React.createContext({
    loading: false,
    data: {},
    error: false,
})

const UserVotesContextProvider = props => {
    const { error, data, loading } = useQuery( USER_VOTES_QUERY );
    return(
        <UserVotesContext.Provider value={{ error, loading, data }}>
            {props.children}
        </UserVotesContext.Provider>
    )
}

// we are not gonna do SSR for USER_VOTES_QUERY cause it doesn't get cookie in middleware (backend)
// todo find better auth method?

export default UserVotesContext;
export { UserVotesContextProvider };