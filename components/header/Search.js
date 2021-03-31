// warn: Search needs to be loaded using dynamic, to prevent issue with id's not matching
// see Header.js to see it in action

//import gql from 'graphql-tag';
//import { gql } from '@apollo/client';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
//import { ApolloConsumer } from 'react-apollo';
import debounce from 'lodash.debounce';
import Loader from '../snippets/Loader';



import { useRef, useState } from 'react'; // used?
import { useCombobox } from 'downshift';
import { useLazyQuery, gql } from '@apollo/client';


const SEARCH_TAGS_QUERY = gql`
    query SEARCH_TAGS_QUERY($search: String!){
        tags( nameContains: $search ){
            id
            name
            slug
        }
    }
`;

const SEARCH_LOCATIONS_QUERY = gql`
    query SEARCH_LOCATIONS_QUERY($search: String!){
        locations( nameContains: $search ){
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



const items = ['Neptunium', 'Plutonium', 'aaaaa', 'bbbbbbb', 'ccccccccc']

function Search() {
    const [inputItems, setInputItems] = useState(items)
    const {
      isOpen,
      selectedItem,
      getMenuProps,
      getInputProps,
      getComboboxProps,
      highlightedIndex,
      getItemProps,
      //getLabelProps
    } = useCombobox({
      items: inputItems,
      onInputValueChange: ({inputValue}) => {
        setInputItems(
          items.filter(item =>
            item.toLowerCase().startsWith(inputValue.toLowerCase()),
          ),
        )
      },
    })
  
    return (

        <>
        {/*<label {...getLabelProps()}>Choose an element:</label>*/}
        <div {...getComboboxProps()}>
          <input {...getInputProps()} />
        </div>
        <ul {...getMenuProps()}>
          {isOpen &&
            inputItems.map((item, index) => (
              <li
                style={
                  highlightedIndex === index ? {backgroundColor: '#bde4ff'} : {}
                }
                key={`${item}${index}`}
                {...getItemProps({item, index})}
              >
                {item}
              </li>
            ))}
        </ul>
      </>
    );

    return(
        <div className="main-search__container">
            <div className="main-search__input-wrap" {...getComboboxProps()}>
                <input 
                    {...getInputProps()}
                    type="search"
                    placeholder="Search for a location or tag"
                    id="search"
                    className="main-search__input"
                />
                {/*(tagsLoading || locationLoading) && <Loader containerClass="search-loader" />*/}
            </div>

            {/*<div className="main-search__dropdown" {...getMenuProps()}>

                { isOpen && 
                (
                    <div className="main-search__dropdown">
                        {
                        //limited.map((item, index) => (
                        inputItems.map((item, index) => (
                            <div 
                                {...getItemProps({item, index})}
                                //key={item.id}
                                key={`${item}${index}`}
                                //highlighted={ (index === highlightedIndex).toString() }
                                className="main-search__dropdown__result"
                                style={{ 
                                    paddingLeft: (index === highlightedIndex) ? ".85em": ".5em", 
                                    backgroundColor: (index === highlightedIndex) ? "#eee": "#fff", 
                                }}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                )}

            </div>*/}

            <ul {...getMenuProps()}>
            {isOpen &&
                inputItems.map((item, index) => (
                <li
                    style={
                    highlightedIndex === index ? {backgroundColor: '#bde4ff'} : {}
                    }
                    key={`${item}${index}`}
                    {...getItemProps({item, index})}
                >
                    {item}
                </li>
                ))}
            </ul>
            
        </div>
    )
  }





function Search3(){
    // setup the 2 lazy queries
    const [getLocationData, { 
        error: locationError, loading: locationLoading, data: locationData 
    }] = useLazyQuery(SEARCH_LOCATIONS_QUERY);
    const [getTagsData, { 
        error: tagsError, loading: tagsLoading, data: tagsData 
    }] = useLazyQuery(SEARCH_TAGS_QUERY);

    // setup combobox
    const {
        getComboboxProps,
        getInputProps,
        getMenuProps, // menu = dropdown
        getItemProps,
        isOpen,
        highlightedIndex,
        inputValue,
    } = useCombobox({
        //items: data && data[props.type] ? data[props.type] :  [], // these are the results from the apollo query
        items: [],
        inputValue: "", // props.value, // this is the state it inherits from createItem
        //stateReducer, // see above, prevent esc

        // this function handles the apollo query that populates the dropdown
        onInputValueChange: ({ inputValue }) => {
            // call getLazyData with current inputValue
            // goes through the debounceGetLazyData ref
            // debounceGetLazyData.current(inputValue)
        },
        // this makes dropdown a controlled input
        // it inherits state (inputValue) and handleSetState from a parent (createItem)
        // onStateChange: (changes) => {
        //     if(changes.type == useCombobox.stateChangeTypes.InputChange){
        //         props.handleSetState(
        //             { [props.type.slice(0,-1)]: changes.inputValue, }, 
        //             props.type == 'locations' ? null : props.id.split('-')[1] // index
        //         )
        //     }
        // },

        // this handles the selection of a dropdown item
        // onSelectedItemChange: (changes) => {
        //     props.handleSetState(
        //         { [props.type.slice(0,-1)]: changes.selectedItem && changes.selectedItem.name ? changes.selectedItem.name : "", }, 
        //         props.type == 'locations' ? null : props.id.split('-')[1] // index
        //     )
        // },
        
        // on select, what is the actual value if the item is an object
        itemToString: (item) => item?.name || '',

        // TODO: reset data when a new query is made ??
    })

    // we will have 2 data streams: tagsData and locationData
    // we shuffle them together so we get one stream even if one of both are empty
    // [1,2,3] and [a,b,c] becomes [1,a,2,b,3,c]
    // [] and [1,2,3] becomes [1,2,3]
    const mixed = shuffleArrays(locationData || [], tagsData || []);
    // in any case, we limit them to 10 results and use that to render
    const limited = mixed.slice(0,10);


    return(
        <div className="search__container">
            <div className="search__input__tempwrap" {...getComboboxProps()}>
                <input 
                    {...getInputProps()}
                    type="search"
                    placeholder="Search for a location or tag"
                    id="search"
                    className="search__input"
                />
                {(tagsLoading || locationLoading) && <Loader containerClass="search-loader" />}
            </div>

            <div className="dropdown__tempwrap" {...getMenuProps()}>

                { isOpen && 
                inputValue.length > 2 && 
                !tagsError && !locationError && 
                limited && 
                limited.length > 0 && (
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
                        {/*
                            this.state.queryError && (
                                <div className="dropdown__result dropdown__result--error">!! {this.state.queryErrorMessage}</div>
                            )
                        }
                        {!limited.length && !this.state.loading && inputValue.length >= 3 && this.state.queryCalled && !this.state.queryError && (
                            <div className="dropdown__result">Nothing found for "{inputValue}"</div>
                        )*/}
                    </div>
                )}

            </div>

            

        </div>
    );
}

class Search2 extends React.Component{
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
            hrefPath = '/tags/[tagSlug]';
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