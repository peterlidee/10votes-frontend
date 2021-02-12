//import gql from 'graphql-tag';
import { gql } from '@apollo/client';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
//import { ApolloConsumer } from 'react-apollo';
import debounce from 'lodash.debounce';
import Loader from '../snippets/Loader';

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
        locations(nameContains: $search){
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
        queryError: false,
        queryErrorMessage: '',
        queryCalled: false,
    }
    onChange = debounce (async (e, client) => {
        // turn loading on
        this.setState({
            loading: true,
            queryError: false,
            queryErrorMessage: '',
        })

        // don't query empty fields!
        if(e.target.value.length == 0){
            this.setState({
                tags: [],
                locations: [],
                loading: false,
            })
        }else{
            let queryError = false;
            let queryErrorMessage = "";
            // manually query apollo client
            // search for tags
            const tagsRes = await client.query({
                query: SEARCH_TAGS_QUERY,
                variables: { search: e.target.value },
                fetchPolicy: "network-only",
            }).catch(error => {
                queryError = true;
                queryErrorMessage = error.message;
                console.log(error.message)
            });
            // search for locations
            const locationsRes = await client.query({
                query: SEARCH_LOCATIONS_QUERY,
                variables: { search: e.target.value },
                fetchPolicy: "network-only",
            }).catch(error => {
                queryError = true;
                queryErrorMessage = error.message;
                console.log(error.message)
            });
            if(queryError){
                this.setState({
                    queryError,
                    queryErrorMessage,
                    queryCalled: true,
                    loading: false,
                    tags: [],
                    locations: [],
                })
            }else{
                this.setState({
                    tags: tagsRes.data.tags,
                    locations: locationsRes.data.locations,
                    loading: false,
                    queryError: false,
                    queryErrorMessage: '',
                    queryCalled: true,
                })
            }
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
            <Downshift 
                itemToString={item => item === null ? '' : `${item.name}`}
                //ref={downshift => (this.downshift = downshift)}
                onChange={this.routeToTag}
            >
                {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => {
                    return(
                        <div className="search__container">
                            <ApolloConsumer>
                                {(client) => (
                                    <>
                                        <input 
                                            {...getInputProps({
                                                type: 'search',
                                                placeholder: 'Search for a location or tag',
                                                id: 'search',
                                                className: 'search__input',
                                                onChange: (e) => {
                                                    e.persist()
                                                    this.onChange(e, client)
                                                },
                                            })}
                                        />
                                        {this.state.loading && <Loader containerClass="search-loader" />}
                                    </>
                                )}
                            </ApolloConsumer>
                            {isOpen && inputValue.length >= 3 && (
                                <div className="dropdown">
                                    {limited.map((item, index) => (
                                        <div 
                                            {...getItemProps({ item })}
                                            key={item.id}
                                            highlighted={ (index === highlightedIndex).toString() }
                                            className="dropdown__result"
                                            style={{ 
                                                paddingLeft: (index === highlightedIndex) ? ".85em": ".5em", 
                                                backgroundColor: (index === highlightedIndex) ? "#eee": "#fff", 
                                            }}
                                        >
                                            {item.name} <span className="dropdown__result-type">{(item.__typename).toLowerCase()}</span>
                                        </div>
                                    ))}
                                    {
                                        this.state.queryError && (
                                            <div className="dropdown__result dropdown__result--error">!! {this.state.queryErrorMessage}</div>
                                        )
                                    }
                                    {!limited.length && !this.state.loading && inputValue.length >= 3 && this.state.queryCalled && !this.state.queryError && (
                                        <div className="dropdown__result">Nothing found for "{inputValue}"</div>
                                    )}
                                </div>
                            )}
                        </div>
                    )
                }}
            </Downshift>
        )
    }
}

export default Search;
export { SEARCH_LOCATIONS_QUERY, SEARCH_TAGS_QUERY };