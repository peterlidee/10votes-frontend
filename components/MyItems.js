//import { Query } from 'react-apollo';
import Link from 'next/link';
import User from './account/User';
import Item from './Item';
import Title from './Title';
import Error from './Error';

const MyItems = props => (
    <>
        <Title>My pics</Title>
        <User>
            {({ loading, error, data }) => {
                
                if(loading) return <p>...loading</p>
                if(error) return <Error error={error} />
                if(!data.me) return <p>Uhm, something went wrong. Try again?</p>
                const { me } = data;
                
                return(
                    <div>
                        {me.items.length === 0 &&
                            <>
                                <p>Looks like you haven't uploaded any pics yet.</p>
                                <Link href="/addapicture">
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
                                <Link href="/addapicture">
                                    <a>Upload another pic</a>
                                </Link>
                                ({10-me.items.length} uploads left)
                            </>
                        }
                    </div>
                )

            }}
        </User>
    </>
)

export default MyItems;