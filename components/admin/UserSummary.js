const UserSummary = ({ data }) => (
    <div className="admin-section">
        <h2 className="item-crud__title title">Summary</h2>
        <div className="taxonomy-summary">
            <div className="taxonomy-summary__label">user email:</div>
            <div>{data.user.email}</div>
            <div className="taxonomy-summary__label">uploads:</div>
            <div>{data.user.items.length}</div>
            <div className="taxonomy-summary__label">votes received:</div>
            <div>{data.user.items.reduce((acc, item) => { return acc + item.votes.length }, 0)}</div>
            <div className="taxonomy-summary__label">votes cast:</div>
            <div>{data.user.votes.length}</div>
        </div>
    </div>
);

export default UserSummary;