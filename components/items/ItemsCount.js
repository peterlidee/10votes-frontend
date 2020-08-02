import { Query } from 'react-apollo';
import getRouterData from '../../lib/getRouterData';

const ItemsCount = props => {
    const routerData = getRouterData(true);
    return(
        <Query query={routerData.query} variables={routerData.variables}>
            {({ loading, error, data }) => {
                if(loading || error || !data.itemsConnection) return null;
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