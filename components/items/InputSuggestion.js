// this component has 3 parts
// 1. an input field
// 2. an deletebutton
// 3. a dropdown with suggestions

import gql from 'graphql-tag';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import debounce from 'lodash.debounce';
import Loader from '../snippets/Loader';

const items = ["apple", "pear", "orange", "grape", "banana"]

class InputSuggestion extends React.Component{
    
    state = {
        loading: false,
        queryError: false,
        queryErrorMessage: '',
        queryCalled: false,
        results: [],
    }
    
    handleOnStateChange = ({ inputValue, type }) => {
        if(type == '__autocomplete_change_input__'){
            this.props.handleSetState({location: inputValue})
        }
        return inputValue;
    }

    handleInputSelect = (selection) => {
        console.log('selection', selection)
        this.props.handleSetState({
            location: selection
        })
    }
    handleInputChange = debounce(e => {
        console.log('handleInputChange called', e.target.value)
        
    }, 350);


    render(){
        return(
            <>
            <div>
                location from props: {this.props.location}
            </div>
            <Downshift
                /*onStateChange={({ inputValue }) => {
                    console.log('val', inputValue)
                    //console.log('this', this)
                    //this.handleInputChange(inputValue);
                    //this.props.handleTest();
                    
                    //this.props.handleSetState({ location: inputValue || '' })
                    //return inputValue;
                    
                    //return inputValue && this.handleInputChange(inputValue ? inputValue : "")
                    //return this.handleInputChange(inputValue ? inputValue : "") && inputValue
                    return inputValue && this.props.handleSetState({ location: inputValue || '' });
                }}*/
                //onStateChange={({inputValue}) => this.handleOnStateChange(inputValue)}
                
                onStateChange={this.handleOnStateChange}
                
                selectedItem={this.props.location}
                
                onChange={this.handleInputSelect}
                >
                {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex, selectedItem, clearSelection }) => (
                    <div>
                        test: 
                        
                        <input {...getInputProps({
                           placeholder: 'fe. Brussel',
                           id: "location",
                           className: "",
                           onChange: (e) => {
                               e.persist();
                               //this.handleInputChange(e, client)
                               this.handleInputChange(e)
                           }
                        })} />
                        { selectedItem && 
                            <button type="button" onClick={() => {
                                this.props.handleSetState({ location: '' })
                                clearSelection();
                            }}>
                                &times;
                            </button>
                        }


                        {isOpen && (
                            <div>
                                {items
                                    .filter(i => !inputValue || i.includes(inputValue))
                                    .map((item, index) => (
                                    <div
                                        {...getItemProps({
                                        key: item,
                                        index,
                                        item,
                                        style: {
                                            backgroundColor:
                                            highlightedIndex === index
                                                ? "lightgray"
                                                : "white",
                                            fontWeight:
                                            selectedItem === item ? "bold" : "normal"
                                        }
                                        })}
                                    >
                                        {item}
                                    </div>
                                    ))}
                            </div>
                        )}
                    </div>
                )}
            </Downshift>
            </>
        );
    }
}

export default InputSuggestion;