// warn: Search needs to be loaded using dynamic, to prevent issue with id's not matching server and client side
// see Header.js to see it in action

import { useRef } from 'react';
import Router from 'next/router';
import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import { useCombobox } from 'downshift';
import Loader from '../snippets/Loader';

import { LOCATIONS_QUERY } from '../../queriesAndMutations/locations/locationQueries'
import { TAGS_QUERY } from '../../queriesAndMutations/tags/tagQueries'

// [1,2,3] and [a,b,c] becomes [1,a,2,b,3,c]
// [] and [1,2,3] becomes [1,2,3]
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

function Search() {

    // setup the 2 lazy queries
    const [getLocationsData, { 
        error: locationsError, loading: locationsLoading, data: locationsData, called: locationsCalled
    }] = useLazyQuery(LOCATIONS_QUERY);
    const [getTagsData, { 
        error: tagsError, loading: tagsLoading, data: tagsData, called: tagsCalled 
    }] = useLazyQuery(TAGS_QUERY);

    // we will have 2 data streams: tagsData and locationData
    // we shuffle them together so we get one stream even if one of both are empty
    const mixed = shuffleArrays((locationsData && locationsData.locations) || [], (tagsData && tagsData.tags) || []);
    // in any case, we limit them to 10 results and use that to render
    const limited = mixed.slice(0,10);

    // merge the error(s)
    const error = locationsError || tagsError;
    // merge called
    const called = locationsCalled && tagsCalled;

    // this function call the 2 lazyQueries
    const getLazyData = (inputValue) => {
        // clean up value
        const value = inputValue.trim();
        // don't query empty value or value shorter then 3
        if(value.length > 2){
            // make the query
            getTagsData({ variables: { nameContains: value } })
            getLocationsData({ variables: { nameContains: value } })
        }   
    };

    // in order for debouncing to work, we need an var that persists, so we use useRef
    // https://github.com/downshift-js/downshift/issues/347#issuecomment-469531762
    const debounceGetLazyData = useRef(null);
    // if there's no .current, we add debounced getLazyData
    if (!debounceGetLazyData.current) {
        debounceGetLazyData.current = debounce(getLazyData, 400);
    }

    // on selection of a dropdown result, this function handles the routing
    const routeToTag = (item) => {
        if(!item){
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

    // call useComboBox
    const {
        isOpen,
        selectedItem,
        getMenuProps,
        getInputProps,
        getComboboxProps,
        highlightedIndex,
        getItemProps,
        inputValue,
    } = useCombobox({
        items: limited,

        // this function handles the apollo query that populates the dropdown
        onInputValueChange: ({ inputValue }) => {
            // call getLazyData with current inputValue
            // goes through the debounceGetLazyData ref
            debounceGetLazyData.current(inputValue)
        },

        // this handles the selection of a dropdown item
        onSelectedItemChange: (changes) => {
            routeToTag(changes.selectedItem);
        },

        // on select, what is the actual value if the item is an object
        itemToString: (item) => item?.name || '',

    })
  
    return (
        <div className="main-search__container">

            <div className="main-search__input-wrap" {...getComboboxProps()}>
                <input 
                    {...getInputProps()}
                    type="search"
                    placeholder="Search for a location or tag"
                    id="search"
                    className="main-search__input"
                />
                {(tagsLoading || locationsLoading) && <Loader containerClass="search-loader" />}
            </div>

            <div className="main-search__dropdown" {...getMenuProps()}>
                { isOpen &&
                !error &&
                limited.length > 0 && 
                inputValue.length > 2 &&
                limited.map((item, index) => (
                    <div 
                        {...getItemProps({item, index})}
                        key={item.id}
                        className="main-search__dropdown__result"
                        style={{ 
                            paddingLeft: (index === highlightedIndex) ? ".85em": ".5em", 
                            backgroundColor: (index === highlightedIndex) ? "#eee": "#fff", 
                        }}
                    >
                        {item.name} <span className="main-search__dropdown__result-type">{(item.__typename).toLowerCase()}</span>
                    </div>
                ))}
                {error && (
                    <div className="main-search__dropdown__result main-search__dropdown__result--error">!! {error.message}</div>
                )}
                {isOpen && 
                !limited.length && 
                !tagsLoading && !locationsLoading && 
                inputValue.length > 2 && 
                called && 
                !error && (
                    <div className="main-search__dropdown__result">Nothing found for "{inputValue}"</div>
                )}
            </div>

        </div>
    );
}

export default Search;