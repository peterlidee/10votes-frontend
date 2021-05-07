import PropTypes from 'prop-types';
import Link from 'next/link';

import DeleteMyItem from './DeleteMyItem';
import Voting from '../voting/Voting';
import MetaTitle from '../snippets/MetaTitle';

function Item2(props){ // props: item, showEdit, hideVote
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
                    <DeleteMyItem id={item.id}>&times; delete item</DeleteMyItem>
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
                                <Link key={tag.id} href="/tag/[tagSlug]" as={`/tag/${tag.slug}`}>
                                    <a className="item__tag item__tag--tag">{tag.name}</a>
                                </Link>
                            ))}
                        </> 
                    }
                </div>
                <div className="item__votes">
                    <div className="item__votes__number">{item.votes.length}</div>
                    <div className="item__votes__label">votes</div>
                </div>
                {!props.hideVote && <Voting currentItemId={item.id} currentItemVotes={item.votes} />}
            </div>
        </article>
    )
}






function Item(props){ // props: item, showEdit, hideVote, single
    const { item } = props;
    // construct a string we will use as alt and/or title: "Image in {location} {tags}"
    const tagsString = item.tags ? item.tags.map(tag => `#${tag.name}`).join(" ") : '';
    const description = `Pic in ${item.location.name} ${tagsString}`;
    return(
        <article className={props.single ? "item item--single" : "item"}>
            {props.single && 
                <MetaTitle>{description}</MetaTitle>}
            {props.single && item.largeImage && 
                <img src={item.largeImage} alt={description} className="item__image item__image--large" />}
            {!props.single && item.image &&
                <Link href={{
                    pathname: '/item',
                    query: { id: item.id },
                }}>
                    <a className="item__image__link">
                        <img src={item.image} alt={description} className="item__image" />
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
                    <DeleteMyItem id={item.id}>&times; delete item</DeleteMyItem>
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
                                <Link key={tag.id} href="/tag/[tagSlug]" as={`/tag/${tag.slug}`}>
                                    <a className="item__tag item__tag--tag">{tag.name}</a>
                                </Link>
                            ))}
                        </> 
                    }
                </div>
                <div className="item__votes">
                    <div className="item__votes__number">{item.votes.length}</div>
                    <div className="item__votes__label">votes</div>
                </div>
                {!props.hideVote && <Voting currentItemId={item.id} currentItemVotes={item.votes} />}
            </div>
        </article>
    )
}



Item.propTypes = {
    item: PropTypes.object.isRequired,
};

Item.defaultProps = {
    showEdit: false,
    hideVote: false,
    single: false,
}

export default Item;