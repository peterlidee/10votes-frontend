import PropTypes from 'prop-types';
import Link from 'next/link';

//import DeleteMyItem from './DeleteMyItem';
//import Voting from '../voting/Voting';

function Item(props){
    const { item } = props;
    return(
        <article className="item">
            {item.image &&
                <Link href={{
                    pathname: '/item',
                    query: { id: item.id },
                }}>
                    <a className="item__image__link">
                        <img src={item.image} alt={`item ${item.id} in ${item.location.name}`} className="item__image" />
                    </a>
                </Link>
            }
            {props.showEdit && 
                <div className="item__edit">
                    <Link
                        href={{
                            pathname: '/update',
                            query: { id: item.id },
                        }}>
                        <a className="item__edit-link">edit item</a>
                    </Link>
                    {/*<DeleteMyItem id={item.id}>&times; delete item</DeleteMyItem>*/}
                </div>
            }
            <div className="item__meta">
                <div className="item__tags">
                    {item.location && 
                        <Link 
                            href="/location/[countryCode]/[place]" 
                            as={`/location/${item.location.country.countryCode}/${item.location.slug}`}
                        >
                            <a className="item__tag item__tag--location">{item.location.name}</a>
                        </Link>
                    }
                    {item.tags.length > 0 &&
                        <>
                            {item.tags.map(tag => (
                                <Link key={tag.id} href="/tags/[tagslug]" as={`/tags/${tag.slug}`}>
                                    <a className="item__tag item__tag--tag">{tag.name}</a>
                                </Link>
                            ))}
                        </> 
                    }
                </div>
                <div className="item__votes">
                    <div className="item__votes__number">{item.voteCount}</div>
                    <div className="item__votes__label">votes</div>
                </div>
                {/*!this.props.hideVote && <Voting currentItemId={item.id} />*/}
            </div>
        </article>
    )
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
};

export default Item;