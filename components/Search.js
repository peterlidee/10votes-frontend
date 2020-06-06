import gql from 'graphql-tag';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import debounce from 'lodash.debounce';

const SEARCH_TAGS_QUERY = gql`
    query SEARCH_TAGS_QUERY($search: String!){
        tags(where: { name_contains: $search }){
            id
            name
            slug
        }
    }
`;

const SEARCH_LOCATIONS_QUERY = gql`
    query SEARCH_LOCATIONS_QUERY($search: String!){
        locations(where: { name_contains: $search }){
            id
            name
            slug
            country{
                id
                name
                countryCode
            }
        }
    }
`;

function shuffleArrays(arr1, arr2){
    const longestArr = arr1.length >= arr2.length ? arr1 : arr2;
    const shortestArr = arr1.length >= arr2.length ? arr2 : arr1;
    const shuffledArr = [];
    longestArr.map((item, i) => {
        shuffledArr.push(item);
        if(shortestArr[i]){ shuffledArr.push(shortestArr[i])}
    });
    return shuffledArr;
}

class Search extends React.Component{
    state = {
        tags: [],
        locations: [],
        loading: false,
    }
    onChange = debounce (async (e, client) => {
        // turn loading on
        this.setState({
            loading: true
        })

        // don't query empty fields!
        if(e.target.value.length == 0){
            this.setState({
                tags: [],
                locations: [],
                loading: false,
            })
        }else{
            // manually query apollo client
            // search for tags
            const tagsRes = await client.query({
                query: SEARCH_TAGS_QUERY,
                variables: { search: e.target.value }
            })
            // search for locations
            const locationsRes = await client.query({
                query: SEARCH_LOCATIONS_QUERY,
                variables: { search: e.target.value },
            })
            this.setState({
                tags: tagsRes.data.tags,
                locations: locationsRes.data.locations,
                loading: false,
            })
        }
    }, 350);

    routeToTag = (item) => {
        if(!item){
            this.setState({ locations: [], tags: [] });
            return null;
        }
        let hrefPath, asPath;
        if(item.__typename === "Tag"){
            hrefPath = '/tags/[tagslug]';
            asPath = `/tags/${item.slug}`;
        }else if(item.__typename === "Location"){
            hrefPath = '/location/[countryCode]/[place]';
            asPath = `/location/${item.country.countryCode}/${item.name}`;
        }
        Router.push(hrefPath, asPath);
    }

    render(){
        // we have 2 data streams: tags and locations
        // we shuffle them together so we get one stream even if one of both are empty
        // [1,2,3] and [a,b,c] becomes [1,a,2,b,3,c]
        // [] and [1,2,3] becomes [1,2,3]
        const mixed = shuffleArrays(this.state.locations, this.state.tags);
        // in any case, we limit them to 10 results and use that to render
        const limited = mixed.slice(0,10);

        resetIdCounter();
        return(
            <div>
                <Downshift 
                    itemToString={item => item === null ? '' : `${item.name} (${item.__typename})`}
                    ref={downshift => (this.downshift = downshift)}
                    onChange={this.routeToTag}
                >
                    {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => {
                        return(
                            <div>
                                <ApolloConsumer>
                                    {(client) => (
                                        <input 
                                            {...getInputProps({
                                                type: 'search',
                                                placeholder: 'Search for a location or tag',
                                                id: 'search',
                                                className: this.state.loading ? 'loading' : '',
                                                onChange: (e) => {
                                                    e.persist()
                                                    this.onChange(e, client)
                                                },
                                            })}
                                        />
                                    )}
                                </ApolloConsumer>
                                {isOpen && (
                                    <div className="dropdown">
                                        {limited.map((item, index) => (
                                            <div 
                                                {...getItemProps({ item })}
                                                key={item.id}
                                                highlighted={ (index === highlightedIndex).toString() }
                                                style={{ backgroundColor: "#eee", paddingLeft: (index === highlightedIndex) ? "1em": "0", }}
                                            >
                                                {item.name} {(item.__typename).toLowerCase()}
                                            </div>
                                        ))}
                                        {!limited.length && !this.state.loading && inputValue.length >= 3 && (
                                            <div>Nothing found for {inputValue}</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    }}
                </Downshift>
            </div>
        )
    }
}

export default Search;