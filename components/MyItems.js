//import { Query } from 'react-apollo';
import Link from 'next/link';
import User from './User';
import DeleteMyItem from './DeleteMyItem';

const MyItems = props => {
    return(
        
        <User>
            {({ loading, error, data }) => {
                
                if(loading) return <p>...loading</p>
                console.log('data', data)

                // not logged in then?
                if(!loading && !data.me) return(
                    <>
                        <p>You need to be logged in to see your pics.</p>
                        <Link href="/signup">
                            <a>sign in</a>
                        </Link>
                    </>
                );

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
                                {me.items.map(item => (
                                    <div key={item.id} >
                                        <Link href={{
                                            pathname: '/item',
                                            query: { id: item.id },
                                        }}>
                                            <a>
                                                <img src={item.image} alt={`${me.name} pic`} />
                                                <div>location: {item.location.name}</div>
                                                {item.tags.length > 0 && 
                                                    <div>
                                                        tags: {item.tags.map(tag => (<span key={tag.id}>{tag.name}</span>))}
                                                    </div>
                                                }
                                                <div>votes: {item.voteCount}</div>
                                            </a>
                                        </Link>
                                        <DeleteMyItem id={item.id}>delete this item</DeleteMyItem>
                                        <Link href={{
                                            pathname: 'update',
                                            query: { id: item.id },
                                        }}>
                                            <a>edit this item</a>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        }
                        {me.items.length < 10 &&
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