//import { Query } from 'react-apollo';
import Link from 'next/link';

import User from './account/User';

import Item from './Item';
import MetaTitle from './snippets/MetaTitle';
import Loader from './snippets/Loader';
import Error from './snippets/Error';
import UploadButton from './snippets/UploadButton';

const MyItems = props => (
    <section>
        <MetaTitle>Your pics</MetaTitle>
        <h1 className="title">Your pics</h1>
        <User>
            {({ loading, error, data }) => {
                if(loading) return <Loader containerClass="items-loader" />;                
                if(error) return <Error error={error} />
                if(!data.me) return <p className="no-data">Uhm, something went wrong :/. Try reloading the page.</p>;
                const { me } = data;

                if(!me.items.length){
                    return <p className="no-data">Looks like you haven't uploaded any pics yet. Maybe <Link href="/addapicture"><a>upload your first pic</a></Link>?</p>
                }

                const message = "You can edit or delete your uploaded pics here."

                return(
                    <>
                        {me.items.length == 10 && 
                            <p className="items__message">{message} You used all your uploads. We like that.</p>}
                        {me.items.length < 10 &&
                            <p className="items__message">{message} You have {10 - me.items.length} uploads left.</p>}

                        {me.items.length > 0 &&
                            <div className="grid-items">
                                {me.items.map(item => <Item key={item.id} item={item} showEdit={true} hideVote={true} /> )}
                            </div>
                        }
                        {me.items.length < 10 &&
                            <p className="no-data extra-margin">
                                <span style={{"paddingRight": ".5em"}}>You have {10 - me.items.length} uploads left.</span>
                                <UploadButton />
                            </p>
                        }
                    </>
                )

            }}
        </User>
    </section>
)

export default MyItems;