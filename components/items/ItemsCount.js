import { Query } from 'react-apollo';
import getRouterData from '../../lib/getRouterData';

const ItemsCount = props => {
    const routerData = getRouterData(true);
    return(
        <Query query={routerData.query} variables={routerData.variables}>
            {({ loading, error, data }) => {
                if(loading) return <span>..</span>;
                if(error || !data.itemsConnection) return null;
                const count = data.itemsConnection.aggregate.count;
                return <span>{count}</span>;
            }}
        </Query>
    );
}

export default ItemsCount;