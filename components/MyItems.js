//import { Query } from 'react-apollo';
import Link from 'next/link';
import User from './User';
import DeleteMyItem from './DeleteMyItem';
import Item from './Item';

const MyItems = props => {
    return(
        <User>
            {({ loading, error, data }) => {
                
                if(loading) return <p>...loading</p>

                // not logged in then?
                if(!loading && !data.me) return null;

                const { me } = data;

                return(
                    <div>
                        I'm {me.name}'s items component
                        {me.items.length === 0 &&
                            <>
                                <p>Looks like you haven't uploaded any pics yet.</p>
                                <Link href="/sell">
                                    <a>Upload your first pic</a>
                                </Link>
                            </>
                        }
                        {me.items.length > 0 &&
                            <div>
                                {me.items.map(item => <Item key={item.id} item={item} showEdit={true} hideVote={true} /> )}
                            </div>
                        }
                        {me.items.length < 10 && me.items.length > 0 &&
                            <>
                                <Link href="/sell">
                                    <a>Upload another pic</a>
                                </Link>
                                ({10-me.items.length} uploads left)
                            </>
                        }
                    </div>
                )

            }}
        </User>
    )
}

export default MyItems;