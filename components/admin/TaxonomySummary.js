import Link from 'next/link'
import GetItemsCount from '../items/GetItemsCount'

// give summary of taxonomy: we don't use this for users
// tag: name + # items
// locations: name + countryname + #items

const TaxonomySummary = (props) => ( // type, data
    <div className="admin-section">
        <h2 className="item-crud__title title">Summary</h2>
        <div className="taxonomy-summary">
            {/* name / email */}
            <div className="taxonomy-summary__label">{props.type.slice(0,-1)} name:</div>
            <div>
                {props.type == 'tags' && '#'}
                {props.data[props.type.slice(0,-1)].name}
            </div>

            { /* country */ }
            {props.type == "location" && <><div>country:</div><div>{props.data.country.name}</div></>}

            { /* number of items */}
            {props.type == "tags" && (
                <Link href={`/tag/${props.data.tag.slug}`}>
                    <a className="taxonomy-summary__label taxonomy-summary__link">items with tags:</a>
                </Link>
            )}
            {props.type == "locations" && (
                <Link href={`/location/${props.data.location.country.countryCode}/${props.data.location.slug}`}>
                    <a className="taxonomy-summary__label taxonomy-summary__link">items in location:</a>
                </Link>
            )}
            <GetItemsCount type={props.type} data={props.data}>
                {({ loading, error, data: countData }) => {
                    if(loading || error || !countData || !countData.itemsConnection) return null;
                    return <div className="taxonomy-summary__count">{countData.itemsConnection.aggregate.count}</div>
                }}
            </GetItemsCount>

        </div>
    </div>
)

export default TaxonomySummary;