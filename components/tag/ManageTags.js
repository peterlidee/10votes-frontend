import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import CreateTag from './CreateTag';
import ItemSelect from '../ItemSelect';


const SEARCH_TAGS_QUERY = gql`
    query SEARCH_TAGS_QUERY($searchTerm: String!){
        tags(where: {
            name_contains: $searchTerm
        }){
            id
            name
        }
    }
`;

class ManageTags extends React.Component{
    static propTypes = {
        selection: PropTypes.array.isRequired,
        handleTagSelection: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        handleLoading: PropTypes.func.isRequired,
    }
    state = {
        tagName: '',
        tags: [],
        //selection: [],
    }
    handleChange = async (e, client) => {
        this.setState({ [e.target.name]: e.target.value, });
    };
    handleSearch = debounce(async(e, client) => {
        this.props.handleLoading(true);
        if(e.target.value.trim().length >= 3){
            const res = await client.query({
                query: SEARCH_TAGS_QUERY,
                variables: { searchTerm: e.target.value.trim() },
                fetchPolicy: "network-only"
            });
            this.setState({
                tags: res.data.tags,
            });
        }else if(e.target.value.trim().length < 3){
            this.setState({
                tags: [],
            })
        }
        this.props.handleLoading(false);
    }, 350);

    handleSelect = (tag) => {
        this.props.handleTagSelection(tag);
        this.setState({ 
            tagName: '', 
            tags: [], 
        });
    }
    render(){
        // check if the tag.name already exists, works asyncronous
        const tagExists = this.state.tags.findIndex(tag => tag.name.toLowerCase() == this.state.tagName.trim().toLowerCase()) >= 0;

        return(
            <div> 
                {this.props.selection.length > 0 &&
                    <div>
                        <span>tags:</span>
                        {this.props.selection.map(tag => (
                            <span key={tag.id}>
                                {tag.name}
                                <button type="button" onClick={() => this.handleSelect(tag)}>&times;</button>
                            </span>
                        ))}
                        <span>{this.props.selection.length} of 3</span>
                    </div>
                }
                {this.props.selection.length < 3 &&
                    <>
                        <label htmlFor="tagName">Add a tag</label>
                        <ApolloConsumer>
                            {(client) => (
                                <input 
                                    type="text" name="tagName" id="tagName" 
                                    minLength="3" maxLength="25"
                                    value={this.state.tagName} onChange={e => {
                                        e.preventDefault();
                                        e.persist();
                                        this.handleChange(e);
                                        this.handleSearch(e, client);
                                }} />
                            )}
                        </ApolloConsumer>
                    </>
                }
                {this.state.tags.length == 0 && this.state.tagName.trim().length >= 3 &&
                    <div>No suggestions found for {this.state.tagName}</div>
                }
                {this.state.tags.length > 0 &&
                    <div>
                        {this.state.tags.map(tag => {
                            return <ItemSelect 
                                key={tag.id} 
                                id={tag.id} 
                                name={tag.name} 
                                handleSelect={() => this.handleSelect(tag)} 
                                checked={this.props.selection.findIndex(selectedItem => selectedItem.id == tag.id) >= 0}
                                />
                        })}
                    </div>
                }
                { 
                // only show createTag when tag has at least 3 letters
                this.state.tagName.trim().length >= 3 && 
                // do not show it if there is already a tag with the exact same name
                !tagExists  &&
                    <CreateTag 
                        data={{ name: this.state.tagName.trim() }} 
                        handleSelect={this.handleSelect} 
                        loading={this.props.loading} />
                }
            </div>
        );
    }
}



export default ManageTags;
export { SEARCH_TAGS_QUERY };