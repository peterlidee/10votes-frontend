//import { Query } from 'react-apollo';
//import { useQuery } from '@apollo/client';
import getRouterData from '../../lib/getRouterData';
import { Query } from '@apollo/client/react/components'

// function ItemsCount(props){
//     const { loading, error, data } = useQuery()
// }

const ItemsCount = props => {
    const routerData = getRouterData(true);
    return(
        <Query 
            query={routerData.query} 
            variables={routerData.variables} 
            fetchPolicy="cache-and-network"
        >
            {({ loading, error, data }) => {
                if(loading || error || !data || !data.itemsConnection) return null;
                const count = data.itemsConnection.aggregate.count;
                return(
                    <>
                        <span className="title__count-number">{count}</span>
                        <span className="title__count-label">{count === 1 ? 'pic' : "pics"}</span>
                    </>
                )
            }}
        </Query>
    );
}

export default ItemsCount;