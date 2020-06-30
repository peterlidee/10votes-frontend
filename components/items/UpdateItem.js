import { Mutation, Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { CURRENT_USER_QUERY } from '../account/User';

import ManageLocation from './ManageLocation';
import ManageTags from './ManageTags';
import Error from '../Error';
import Title from '../Title';
import Link from 'next/link';

const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
        $id: ID!
        $locationName: String
        $locationId: ID
        $oldLocationId: ID
        $tagNames: [String]
        $tagIds: [ID]
        $oldTagIds: [ID]
    ){
        updateItem(
            id: $id
            locationName: $locationName
            locationId: $locationId
            oldLocationId: $oldLocationId
            tagNames: $tagNames
            tagIds: $tagIds
            oldTagIds: $oldTagIds
        ){
            id
        }
    }
`;

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!){
        item(where : {id: $id}){
            id
            image
            location{
                id
                name
                country{
                    id
                    name
                }
            }
            tags{
                id
                name
            }
            user{
                id
            }
        }
    }
`;

class UpdateItem extends React.Component{
    state = {
        errorMessage: '',
        locationEdit: false,
        locationName: '',
        locationId: '',
        tagsEdit: false,
        tags: [ 
            {name: "", id: ""}, {name: "", id: ""}, {name: "", id: ""} 
        ],
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

    handleEdit = (field, data) => { 
        this.setState({
            [`${field}Edit`]: true
        });
        if(field === "tags"){
            // for tags we need to deal with tags that already exist, so we pass them
            if(data[0]){ // if there are fields, set them to state
                // copy the tags from data into state to save them
                // once we call updateItem mutation, we need to pass the tags that need to be deleted, we need them for that
                const dataBackup = [...data];
                // construct the three items in state
                const tagsToAdd = 3 - data.length;
                for(var i = 0; i < tagsToAdd; i++){
                    data.push({ name: "", id: "" });
                }
                this.setState({ 
                    tags: data, 
                    oldTags: dataBackup 
                });
            }
        }
    }

    //(copied from createItem)
    handleTagChange = (value, i) => { 
        const tags = [...this.state.tags];
        tags[i] = {name: value, id: ""};
        this.setState({
            tags
        })
    }

    //(copied from createItem)
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

    handleCancelEdit = () => {
        this.setState({
            errorMessage: '',
            locationEdit: false,
            locationName: '',
            locationId: '',
            tagsEdit: false,
            tags: [
                {name: "", id: ""}, {name: "", id: ""}, {name: "", id: ""}
            ],
        })
    }

    handleUpdateItem = async(e, updateItemMutation, oldLocation, oldTags) => {
        e.preventDefault();
        // check if location isn't empty
        if(this.state.locationEdit && !this.state.locationName){
            this.setState({
                errorMessage: "Please add a location!"
            });
        }else{
            // construct the variables
            let variables = {
                id: this.props.id,
            };

            // 1. check if a location was selected
            if(this.state.locationEdit){
                // and the location changed
                if(oldLocation.name !== this.state.locationName){
                    variables.locationName = this.state.locationName;
                    variables.oldLocationId = oldLocation.id;
                    // if there's a locationId, an existing location was selected, so pass it aswell
                    if(this.state.locationId) variables.locationId = this.state.locationId;
                }
            } // else the location did not change, don't pass location

            // 2. handle tag changes
            if(this.state.tagsEdit){

                const newTagNames = [];
                const newTagIds = [];

                // construct arrays of the new tag names and ids to pass as variables
                this.state.tags.map(tag => {
                    if(tag.name){ // filter out the empty ones
                        newTagNames.push(tag.name.trim());
                        newTagIds.push(tag.id);
                    }
                });

                // if there are old tags, add them to variables, we may have to delete them
                if(this.state.oldTags){
                    variables.tagNames = newTagNames;
                    variables.tagIds = newTagIds;
                    variables.oldTagIds = this.state.oldTags.map(oldTag => oldTag.id);
                }else{ // else only send the new names and ids
                    variables.tagNames = newTagNames;
                    variables.tagIds = newTagIds;
                }

            } // end 2. handle tag changes

            // only call mutations when changes are in variables
            if(variables.locationName || variables.tagNames){
                const res = await updateItemMutation({
                    variables
                });
                // console.log('item updated', res);
                if(res.data){
                    // route the user to the single item page, just edited
                    Router.push({
                        pathname: '/item',
                        query: { id: res.data.updateItem.id },
                    });
                }
            }
        }
    } // close handleUpdateItem

    render(){
        if(!this.props.id)return <p>No item found.</p>;
        return(
            <>
            <h2>Edit item</h2>
            <Title>Edit item</Title>
            <Query query={ SINGLE_ITEM_QUERY } variables={{id: this.props.id}}>
                {({ data, loading, error }) => {
                    if(loading) return <p>loading ...</p>
                    if(error)return <Error error={error} />
                    if(!data.item) return <p>No data found for id {this.props.id}</p>
                    
                    return (
                        <Query query={CURRENT_USER_QUERY}>
                            {({data: userData, loading: userLoading, error: userError}) => {

                                // check if logged in user owns this item
                                if(userError) return <Error error={userError} />;
                                if(!loading && !userData.me) return <p>something went wrong, please log in.</p>;
                                if(userData.me.id !== data.item.user.id)return <p>You can only edit your own items!</p>

                                //console.log('data from query', data.item.tags);
                                return(
                                    <Mutation 
                                        mutation={ UPDATE_ITEM_MUTATION }
                                        refetchQueries={[ { query: SINGLE_ITEM_QUERY, variables: {id: this.props.id} } ]}
                                    >
                                        {(updateItem, { error, loading }) => (
                                            <form onSubmit={e => this.handleUpdateItem(e, updateItem, data.item.location, data.item.tags)}>
                                                <Error error={error} />
                                                {this.state.errorMessage && 
                                                    <p>{this.state.errorMessage}</p>
                                                }
                                                <fieldset disabled={loading}>

                                                    <button type="button" onClick={this.handleCancelEdit}>cancel edit</button>

                                                    <img src={data.item.image} alt="upload preview" width="300" />

                                                    { // if locationEdit is false, no changes were made to location, so use query data just to display
                                                        !this.state.locationEdit &&
                                                            <div>
                                                                location: 
                                                                {data.item.location.name} - {data.item.location.country.name} 
                                                                <button type="button" onClick={() => this.handleEdit('location', [])}>&times;</button>
                                                            </div>
                                                    }

                                                    {
                                                        // the location 
                                                        this.state.locationEdit &&
                                                            <ManageLocation 
                                                                handleLocationSelection={this.handleLocationSelection}
                                                                handleLocationChange={this.handleLocationChange}
                                                                locationName={this.state.locationName}
                                                                locationId={this.state.locationId} />
                                                    }

                                                    { // if tagsEdit is false, no changes were made to tags, so use query data just to display
                                                        !this.state.tagsEdit &&
                                                            <div>
                                                                {!data.item.tags[0] && <span>No tags entered</span>}
                                                                {data.item.tags[0] &&
                                                                    <>
                                                                        tags: 
                                                                        {data.item.tags.map(tag => <span key={tag.id}>{tag.name}</span>)}
                                                                    </>
                                                                }
                                                                <button type="button" onClick={() => this.handleEdit('tags', [...data.item.tags])}>
                                                                    {data.item.tags[0] && <>edit tags</>}
                                                                    {!data.item.tags[0] && <>add tags</>}
                                                                </button>
                                                            </div>
                                                    }

                                                    {
                                                        // if tagsEdit = true, show manageTags component!
                                                        this.state.tagsEdit &&
                                                            <ManageTags 
                                                                tags={this.state.tags}
                                                                handleTagChange={this.handleTagChange}
                                                                handleTagSelection={this.handleTagSelection} />
                                                    }

                                                    <button>save changes</button>

                                                </fieldset>
                                            </form>
                                        )}
                                    </Mutation>
                                )
                            }}
                        </Query>
                    )
                }}
            </Query>
        </>
        )
    }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION, SINGLE_ITEM_QUERY };