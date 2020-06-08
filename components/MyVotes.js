import User from './User';
import Item from './Item';
import Error from './Error';
import Title from './Title';

const MyVotes = props => (
    <>
        <Title>My votes</Title>
        <User>
            {({ data, loading, error }) => {

                if(loading) return <p>...loading</p>
                if(error) return <Error error={error} />
                if(!loading && !data.me) return null;

                const { me } = data;
                //console.log('me myvotes', me)

                if(!me.votes.length){
                    return <p>Looks like you don't have any votes. Nothing to see here then. :/</p>
                }
                return(
                    <div>
                        {me.votes.length === 10 && <p>All 10 votes cast.</p>}
                        {me.votes.map(vote => <Item key={vote.id} item={vote.item} />) }
                    </div>
                )
            }}
        </User>
    </>
);

export default MyVotes;