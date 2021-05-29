import Item from '../item/Item';

const UsersItems = props => (
    <section>
        <h1 className="title">Users' pics</h1>
        <div className="grid-items">
            {props.items.map(item => <Item key={item.id} item={item} showEdit={true} hideVote={true} /> )}
        </div>
    </section>
)

// todo update delete and edit items, needs refetching or something for admin

export default UsersItems;