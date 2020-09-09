import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import ItemSelect from './ItemSelect';


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
        tags: PropTypes.array.isRequired,
        handleTagSelection: PropTypes.func.isRequired,
        handleTagChange: PropTypes.func.isRequired,
    }

    // state.tags gets (re)set to this
    initialState = {
        tagsQuery: [],
        currentTagIndex: 0,
    }

    state = {...this.initialState}

    handleSearch = debounce(async(e, client, i) => {
        if(e.target.value.trim().length >= 3){
            const res = await client.query({
                query: SEARCH_TAGS_QUERY,
                variables: { searchTerm: e.target.value.trim() },
                fetchPolicy: "network-only"
            });
            this.setState({
                tagsQuery: res.data.tags,
                currentTagIndex: i,
            });
        }else if(e.target.value.trim().length < 3){
            this.setState({
                ...this.initialState
            })
        }
    }, 350);

    handleSelect = (tagQuery, i) => {
        this.props.handleTagSelection(tagQuery, i);
        this.setState({ 
            ...this.initialState
        });
    }

    handleClearTag = i => {
        // set the value of tag[i] at ""
        this.props.handleTagChange("", i);
        // also, if there currently are seach results for this i (state.currentIndex = i)
        // remove these results
        if(this.state.currentTagIndex === i){
            this.setState({
                ...this.initialState
            });
        }
    }

    render(){
        return(
            <div className="crud__section crud__tags-container">
                <div>Add tag(s)</div>
                <ApolloConsumer>
                    {(client) => (
                        this.props.tags.map((tag, i) => (
                            <div key={`tag-${i}`}>
                                <input  
                                    type="text" placeholder="enter a tag" minLength="3" maxLength="25"
                                    value={tag.name}
                                    onChange={e => {
                                        // handle change
                                        this.props.handleTagChange(e.target.value, i);
                                        // handle search
                                        e.persist();
                                        this.handleSearch(e, client, i);
                                    }} />
                                {tag.name.length > 0 
                                    && <button type="button" onClick={() => this.handleClearTag(i)}>&times;</button>}
                                { 
                                    // if the query was made for this tag
                                    this.state.currentTagIndex === i && 
                                    // and there are query results
                                    this.state.tagsQuery[0] &&
                                        // show the results
                                        this.state.tagsQuery.map(tagQuery => {
                                            // checks if current search result is already selected
                                            const inSelection = this.props.tags.findIndex(tag => tag.id && tag.id === tagQuery.id) >= 0;
                                            return <ItemSelect 
                                                        key={tagQuery.id} 
                                                        id={tagQuery.id} 
                                                        name={tagQuery.name} 
                                                        handleSelect={() => this.handleSelect(tagQuery, i)} 
                                                        checked={inSelection}
                                                        />
                                        })
                                }
                            </div>
                        ))
                    )}
                </ApolloConsumer>
            </div>
        )
    }
}



export default ManageTags;
export { SEARCH_TAGS_QUERY };