import { gql, useQuery } from '@apollo/client'
import { ITEM_FIELDS_FRAGMENT } from '../../queriesAndMutations/fragments/itemFragment'

// query all items from current user
const USER_ITEMS_QUERY = gql`
    query{
        userItems{
            ...ItemFields
        }
    }
    ${ITEM_FIELDS_FRAGMENT}
`;

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
// look into this, TODO

export default UserItemsContext;
export { UserItemsContextProvider, USER_ITEMS_QUERY };