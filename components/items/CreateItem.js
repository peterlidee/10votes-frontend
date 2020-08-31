import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Link from 'next/link';

import ManageTags from './ManageTags';
import ManageLocation from './ManageLocation';
import { CURRENT_USER_QUERY } from '../account/User';
import Error from '../Error';
import MetaTitle from '../snippets/MetaTitle';
import ManageUpload from './ManageUpload';
import InputSuggestion from './InputSuggestion';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $image: String
        $largeImage: String
        $locationName: String
        $locationId: ID
        $tagNames: [String]!
        $tagIds: [ID]!
    ){
        createItem(
            image: $image
            largeImage: $largeImage
            locationName: $locationName
            locationId: $locationId
            tagNames: $tagNames
            tagIds: $tagIds
        ){
            id
            location{
                id
                items{
                    id
                }
            }
        }
    }
`;

class CreateItem extends React.Component{
    state = {
        //image: "https://res.cloudinary.com/diidd5fve/image/upload/v1598625542/10votes/fldeyu2ufrdtswkziqby.jpg",
        //largeImage: "https://res.cloudinary.com/diidd5fve/image/upload/c_limit,h_1500,q_auto,w_1500/v1598625542/10votes/fldeyu2ufrdtswkziqby.jpg",
        image: "",
        largeImage: "",
        loading: false,
        locationName: '',
        location: '',
        locationId: '',
        errorMessage: "",
        tags: [
            {name: "", id: ""},
            {name: "", id: ""},
            {name: "", id: ""},
        ],
        focus: false,
    }

    handleTest = () => console.log('testing from createItem')

    handleSetState = (newState) => {
        this.setState({
            ...newState
        });
    }

    handleLocationChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleLocationSelection = (location) => {
        this.setState({
            errorMessage: "",
            locationName: location.name,
            locationId: location.id,
        })
    }

    handleTagChange = (value, i) => {
        //console.log('value is', value)
        const tags = [...this.state.tags];
        tags[i] = {name: value, id: ""};
        this.setState({
            tags
        })
    }

    handleTagSelection = (tagQuery, i) => {
        const tags = [...this.state.tags];
        // first, check if the tag isn't already selected
        if(tags.findIndex(tag => tag.id === tagQuery.id) >= 0){
            // tag is already selected!
            tags[i] = {name: "", id: ""}
        }else{
            // new tag
            tags[i] = { name: tagQuery.name, id: tagQuery.id }
        }
        this.setState({ tags });
    }

    handleLoading = (bool) => {
        this.setState({ loading: bool });
    }
    handleCancelAll = (errorMessage = "") => {
        this.setState({
            image: "",
            largeImage: "",
            errorMessage: errorMessage,
            loading: false,
            locationName: "",
            locationId: "",
            tags: [
                {name: "", id: ""},
                {name: "", id: ""},
                {name: "", id: ""},
            ],
        });
    }

    handleCreateItem = async (e, createItem) => {
        e.preventDefault();
        // form validation: are the required fields filled in?
        if(!this.state.locationName){
            this.setState({ errorMessage: "Please add a location!" });
        }else{
            // create the variables
            const variables = {
                image: this.state.image,
                largeImage: this.state.largeImage,
                locationName: this.state.locationName,
            }
            if(this.state.locationId){
                variables.locationId = this.state.locationId;
            }

            // handle tag changes
            const newTagNames = [];
            const newTagIds = [];
            // construct arrays of the new tag names and ids to pass as variables
            this.state.tags.map(tag => {
                if(tag.name){ // filter out the empty ones
                    newTagNames.push(tag.name.trim());
                    newTagIds.push(tag.id);
                }
            });
            // add to variables
            variables.tagNames = newTagNames;
            variables.tagIds = newTagIds;
            // end handle tag changes

            // call the mutation
            const res = await createItem({ variables });
            
            // route the user to the single item page, just created
            Router.push({
                pathname: '/item',
                query: { id: res.data.createItem.id },
            });
        }
    }

    render(){
        return(
            <Query query={CURRENT_USER_QUERY}>
                {({ data }) => {
                    // since this component if guarded by the please signin component, we don't need to worry about loading or error
                    if( data.me.items.length >= 10 ){
                        return <p>You used up all your uploads. Manage them here: <Link href="/myitems"><a>my pics</a></Link></p>
                    }
                    return(
                        <Mutation mutation={ CREATE_ITEM_MUTATION } refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
                            {(createItem, {loading, error}) => (
                                <div className="item-crud-grid">
                                    <form onSubmit={ e => this.handleCreateItem(e, createItem) } id="createItemForm">
                                        <MetaTitle>Add an picture</MetaTitle>
                                        <h2 className="item-crud__title title">Add a Picture</h2>

                                        <Error error={error} />
                                        <fieldset disabled={loading}>
                                        
                                            <button type="button" onClick={() => this.handleCancelAll()}>&times; cancel all</button>


                                            <ManageUpload 
                                                image={this.state.image}
                                                handleSetState={this.handleSetState}
                                                handleCancelAll={this.handleCancelAll}
                                                />
                                            
                                            <InputSuggestion 
                                                handleSetState={this.handleSetState} 
                                                location={this.state.location}
                                                handleTest={this.handleTest}
                                                />

                                            <ManageLocation 
                                                handleLocationSelection={this.handleLocationSelection}
                                                handleLocationChange={this.handleLocationChange}
                                                locationName={this.state.locationName}
                                                locationId={this.state.locationId}
                                                handleSetState={this.handleSetState}
                                                focus={this.state.focus}
                                                />

                                            <ManageTags 
                                                tags={this.state.tags}
                                                handleTagChange={this.handleTagChange}
                                                handleTagSelection={this.handleTagSelection}
                                                handleSetState={this.handleSetState}
                                                focus={this.state.focus}
                                                />

                                            <button disabled={this.state.loading}>submit</button>

                                        </fieldset>
                                    </form>
                                </div>
                            )}
                        </Mutation>
                    )
                }}
            </Query>
        )
    }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };