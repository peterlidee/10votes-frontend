// this component has 3 parts
// 1. an input field
// 2. an clearbutton
// 3. a dropdown with suggestions

// it takes as props:
// value: the value of the input field
// index: if the value is fed from an array, array[index], else -1
// type: what we are looking for, locations, tags of users
// handleSetState: handler for onchange
// handleSelection: handler for select
// required: is the input required or not

import { useRef } from 'react';
import { useCombobox } from 'downshift';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_LOCATIONS_QUERY, SEARCH_TAGS_QUERY } from '../header/Search';

import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';

import Loader from '../snippets/Loader';


function InputSuggestion(props) {
    // what query to make?
    const query = props.type == 'locations' ? SEARCH_LOCATIONS_QUERY : SEARCH_TAGS_QUERY;
    // apollo lazy query, this fetches either tags or locations depending on props.type
    const [getData, { error, loading, data }] = useLazyQuery(query);

    const getLazyData = (inputValue) => {
        // clean up value
        const value = inputValue.trim();
        // don't query empty value or value shorter then 3
        if(value.length > 2){
            // make the query
            getData({ 
                variables: { search: value },
                // fetchPolicy: 'network-only', // we should't have to do this, handy on f.e. on back // TODO
            })
        }   
    };

    // in order for debouncing to work, we need an var that persists, so we use useRef
    // https://github.com/downshift-js/downshift/issues/347#issuecomment-469531762
    const debounceGetLazyData = useRef(null);
    // if there's no .current, we add debounced getLazyData
    if (!debounceGetLazyData.current) {
        debounceGetLazyData.current = debounce(getLazyData, 400);
    }

    // this bit prevents the combobox from clearing its value if esc is pushed
    // cause it is possible that a user inputs a new value, that is one not in db
    // https://github.com/downshift-js/downshift/tree/master/src/hooks/useCombobox#statereducer
    // https://stackoverflow.com/questions/58299322/react-downshift-how-to-prevent-clear-by-escape-key
    function stateReducer(state, actionAndChanges) {
        const {type, changes} = actionAndChanges
        switch (changes.type) {
            // Preventing from clearing value once ESC is pressed
            case useCombobox.stateChangeTypes.InputKeyDownEscape:
                return {
                    ...changes,
                    isOpen: false,
                }
            default:
                return changes;
        }
    };

    const {
        getComboboxProps,
        getInputProps,
        getMenuProps, // menu = dropdown
        getItemProps,
        isOpen,
        highlightedIndex,
        inputValue,
    } = useCombobox({
        items: data && data[props.type] ? data[props.type] :  [], // these are the results from the apollo query
        inputValue: props.value, // this is the state it inherits from createItem
        stateReducer, // see above, prevent esc

        // this function handles the apollo query that populates the dropdown
        onInputValueChange: ({ inputValue }) => {
            // call getLazyData with current inputValue
            // goes through the debounceGetLazyData ref
            debounceGetLazyData.current(inputValue)
        },
        // this makes dropdown a controlled input
        // it inherits state (inputValue) and handleSetState from a parent (createItem, updateItem,...)
        onStateChange: (changes) => {
            if(changes.type == useCombobox.stateChangeTypes.InputChange){
                props.handleSetState(
                    { [props.type]: changes.inputValue, }, 
                    props.index
                )
            }
        },
        // this handles the selection of a dropdown item
        onSelectedItemChange: (changes) => {
            props.handleSelection(
                { [props.type]: changes.selectedItem && changes.selectedItem.name ? changes.selectedItem.name : "", }, 
                props.index,
            )
        },
        // on select, what is the actual value if the item is an object
        itemToString: (item) => item?.name || '',

        // TODO: reset data when a new query is made ??
    })

    return (
        <>
            <div className="input-suggestion__input-container" {...getComboboxProps()}>
                <input 
                    {...getInputProps()}
                    placeholder={`Enter a ${props.type.slice(0,-1)}`}
                    id={`input-suggestion__${props.type}-${props.index}`}
                    className="form-part__input input-suggestion__input"
                    minlenght="2"
                    required={props.required}
                />
                {loading && <Loader containerClass="input-suggestion__loader" />}
                <button type="button" className="clear-button" onClick={() => {
                        props.handleSetState(
                            {[props.type]: ''},
                            props.index 
                        )
                    }} 
                    disabled={!inputValue}
                >
                    &times;
                </button>
            </div>
                                    
            <div className="input-suggestion__dropdown" {...getMenuProps()}>
                {
                    isOpen && 
                    inputValue.length > 2 && 
                    !error && 
                    data && 
                    data[props.type].length > 0 &&
                    (<>
                        { data[props.type]
                            .slice(0, 10) // limit to 10 results
                            .map((item, index) => (
                                <div 
                                    key={item.slug}
                                    className="input-suggestion__result"
                                    style={{
                                        paddingLeft: (index === highlightedIndex) ? ".85em": ".5em", 
                                        backgroundColor: (index === highlightedIndex) ? "#6b9ac4": "#fff",
                                        color: (index === highlightedIndex) ? "#fff": "#403738",
                                    }}
                                    {...getItemProps({ item, index })}
                                >
                                    {item.name} 
                                    {props.type == 'locations' && 
                                        <span className="input-suggestion__result__countryCode">be</span>}
                                </div>
                            )
                        )}
                    </>)
                }
            </div>
        </>
    )
}

InputSuggestion.propTypes = {
    //value: PropTypes.string.isRequired, // can be null!
    index: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    handleSetState: PropTypes.func.isRequired,
    handleSelection: PropTypes.func.isRequired,
}

export default InputSuggestion;