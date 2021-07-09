import { useQuery } from '@apollo/client'
import { USER_ITEMS_QUERY } from '../../queriesAndMutations/items/itemQueries'

// create context with default value
const UserItemsContext = React.createContext({
    loading: false,
    data: {},
    error: false,
})

const UserItemsContextProvider = props => {
    const { error, data, loading } = useQuery( USER_ITEMS_QUERY );
    return(
        <UserItemsContext.Provider value={{ error, loading, data }}>
            {props.children}
        </UserItemsContext.Provider>
    )
}

// we are not gonna do SSR for USER_ITEMS_QUERY cause it doesn't get cookie in middleware (backend)
// TODO: better auth? 

export default UserItemsContext;
export { UserItemsContextProvider };