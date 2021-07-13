import Item from '../item/Item';
import NoData from '../snippets/NoData'

const UsersItems = props => (
    <section style={{marginBottom: '4em'}}>
        <h1 className="title">Users' pics</h1>
        {props.items.length == 0 && <NoData>The user has not uploaded any pics.</NoData>}
        <div className="grid-items">
            {props.items.map(item => <Item key={item.id} item={item} hideVote={true} /> )}
        </div>
    </section>
)

export default UsersItems;