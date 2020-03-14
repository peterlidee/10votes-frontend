import React from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import Downshift, { resetIdCounter } from 'downshift';
import { ApolloConsumer } from 'react-apollo';
import debounce from 'lodash.debounce';

const SEARCH_ITEMS_QUERY = gql`
    query SEARCH_ITEMS_QUERY($searchTerm: String!){
        items(where: {
            OR: [
                {title_contains: $searchTerm},
                {description_contains: $searchTerm}
            ],
        }){
            id
            image
            title
        }
    }
`;

function routeToItem(item){
    console.log(item);
    Router.push({
        pathname: './item',
        query: { id: item.id },
    })
}

class AutoComplete extends React.Component{
    state = {
        items: [],
        loading: false,
    }
    onChange = debounce(async (e, client) => {
        console.log('searching');
        // turn loading on
        this.setState({ loading: true });
        // manually query apollo client
        const res = await client.query({
            query: SEARCH_ITEMS_QUERY,
            variables: { searchTerm: e.target.value }
        });
        this.setState({
            items: res.data.items,
            loading: false,
        }) 
    }, 350);

    render(){
        resetIdCounter();
        return(
            <div>
                <Downshift itemToString={item => (item === null ? '': item.title)} onChange={routeToItem}>
                    {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
                        <div>
                            <ApolloConsumer>
                                {client => (
                                    <input 
                                        {...getInputProps({
                                            type: 'search',
                                            placeholder: 'Search for an item',
                                            id: 'search',
                                            className: this.state.loading ? 'loading' : '',
                                            onChange: e => {
                                                e.persist();
                                                this.onChange(e, client);
                                            },
                                        }
                                    )}/>  
                                )}
                            </ApolloConsumer>
                            {isOpen && (
                                <div className="dropdown">
                                    <div>items will go here:</div>
                                    <div>
                                        {this.state.items.map((item, i) => {
                                            console.log('item', item.title, i, 'highlightedIndex', highlightedIndex);
                                            return(
                                                <div style={{borderLeft: `10px solid ${i === highlightedIndex ? "blue" : "red"}` }} 
                                                    key={item.id} 
                                                    highlighted={i === highlightedIndex}
                                                    {...getInputProps(item)}>
                                                        {i}
                                                        <img src={item.image} alt={item.title} width="50" />
                                                        {item.title}
                                                </div>
                                            );
                                        })}
                                        {!this.state.items.length && !this.state.loading && (
                                            <div>Nothing found for {inputValue}</div>)}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </Downshift>
            </div>
        );
    }
}

export default AutoComplete;