// this component has 3 parts
// 1. an input field
// 2. an deletebutton
// 3. a dropdown with suggestions

import Downshift from 'downshift';
import { ApolloConsumer } from 'react-apollo';
import { SEARCH_LOCATIONS_QUERY, SEARCH_TAGS_QUERY } from '../header/Search';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';

import Loader from '../snippets/Loader';

class InputSuggestion extends React.Component{

    static propTypes = {
        handleSetState: PropTypes.func.isRequired,
        type: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        //value: PropTypes.string.isRequired, // can be null!
    }
		
    state = {
        loading: false,
        queryError: false,
        results: [],
    }
		
    handleOnStateChange = ({ inputValue, type }) => {
        if(type == '__autocomplete_change_input__'){
            this.props.handleSetState({
                [this.props.type.slice(0,-1)]: inputValue}, 
                this.props.type == 'locations' ? null : this.props.id.split('-')[1]
            )
        }
        return inputValue;
    }

    handleInputSelect = (selection) => {
        // console.log('selection', selection)
        this.props.handleSetState({
            [this.props.type.slice(0,-1)]: selection},
            this.props.type == 'locations' ? null : this.props.id.split('-')[1]
        )
    }

    handleInputChange = debounce(async (e, client) => {
        // console.log('handleInputChange called', e.target.value, 'client', client);
        const value = e.target.value.trim();
        
        // don't query empty fields!
        if(value.length == 0){
            this.setState({
                results: [],
                loading: false,
            })
        }else if(value.length >= 3){

            // turn loading on
            this.setState({
                loading: true,
                queryError: false,
            })

            let queryError = false;
            // manually query apollo client
            // search for tags
            const res = await client.query({
                query: this.props.type == 'locations' ? SEARCH_LOCATIONS_QUERY : SEARCH_TAGS_QUERY,
                variables: { search: value }
            }).catch(error => {
                queryError = true;
                console.log(error.message)
            });

            //console.log('res', res)
            
            if(queryError){
                this.setState({
                    queryError,
                    loading: false,
                    results: [],
                })
            }else{ // no error
                this.setState({
                    results: res.data[this.props.type].map(item => item.name),
                    loading: false,
                    queryError: false,
                })
            }
        }
            
    }, 350);

    // https://stackoverflow.com/questions/58299322/react-downshift-how-to-prevent-clear-by-escape-key
    stateReducer = (_, changes) => {
        switch (changes.type) {
            // Preventing from clearing value once ESC is pressed
            case Downshift.stateChangeTypes.keyDownEscape:
                return { isOpen: false };
            default:
                return changes;
        }
    };

    render(){
        return(
            <div className="input-suggestion__container">
                <Downshift
                    onStateChange={this.handleOnStateChange}
                    selectedItem={this.props.value}
                    onChange={this.handleInputSelect}
                    stateReducer={this.stateReducer}
                    >
                    {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex, selectedItem, clearSelection }) => (
                        <div className="input-suggestion">
                            <ApolloConsumer>
                                {(client) => (
                                    <div className="input-suggestion__input-container">
                                        <input {...getInputProps({
                                            placeholder: `Enter a ${this.props.type.slice(0,-1)}`,
                                            id: `input-suggestion__${this.props.id}`,
                                            className: "form-part__input input-suggestion__input",
                                            onChange: (e) => {
                                                e.persist();
                                                this.handleInputChange(e, client)
                                            },
                                            minlenght: 2,
                                            required: this.props.type == 'locations' ? true : false,
                                        })} />
                                        {this.state.loading && <Loader containerClass="input-suggestion__loader" />}
                                        <button type="button" className="clear-button" onClick={() => {
                                            this.props.handleSetState({
                                                [this.props.type.slice(0,-1)]: '' },
                                                this.props.type == 'locations' ? null : this.props.id.split('-')[1]
                                            )
                                            clearSelection();
                                        }} disabled={!selectedItem}>
                                            &times;
                                        </button>
                                        
                                    </div>
                                )}
                            </ApolloConsumer>

                            {
                                isOpen && 
                                inputValue.length >= 3 && 
                                !this.state.queryError && 
                                this.state.results.length > 0 &&
                                (
                                    <div className="input-suggestion__dropdown">
                                    {this.state.results
                                        .slice(0, 10) // limit to 10 results
                                        .map((item, index) => (
                                            <div 
                                            {...getItemProps({ 
                                                item,
                                                index,
                                                key: item,
                                                className: "input-suggestion__result",
                                                style: {
                                                    paddingLeft: (index === highlightedIndex) ? ".85em": ".5em", 
                                                    backgroundColor: (index === highlightedIndex) ? "#6b9ac4": "#fff",
                                                    color: (index === highlightedIndex) ? "#fff": "#403738",
                                                }
                                            })}
                                            >
                                                {item} 
                                                {this.props.type == 'locations' && 
                                                    <span className="input-suggestion__result__countryCode">be</span>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </Downshift>
            </div>
        );
    }
}

export default InputSuggestion;