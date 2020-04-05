import React, { Component } from 'react';
import { Mutation, Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Error from './Error';
import ManageLocation from './ManageLocation';
import ManageTags from './tag/ManageTags';

const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
        $id: ID!
        $locationName: String
        $locationId: ID
        $oldLocationId: ID
        $tags: [ID]
    ){
        updateItem(
            id: $id
            locationName: $locationName
            locationId: $locationId
            oldLocationId: $oldLocationId
            tags:  $tags
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
        }
    }
`;

class UpdateItem extends Component{
    state = {
        loading: false,
        errorMessage: '',
        locationEdit: false,
        locationName: '',
        locationId: '',
    }
    handleLoading = (bool) => {
        this.setState({ loading: bool })
    }

    handleLocationChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleLocationSelection = (location) => {
        this.setState({
            //locationSelection: location,
            errorMessage: "",
            locationName: location.name,
            locationId: location.id,
        })
    }
    handleLocationEdit = () => {
        this.setState({ locationEdit: true })
    }

    handleEditTags = (tags) => {
        this.setState({
            tagSelection: tags
        });
    }

    handleTagSelection = (tag) => {
        const selection = [...this.state.tagSelection];
        const index = selection.findIndex(selectedTag => selectedTag.id === tag.id);
        // is the id already in selection?
        if(index >= 0){
            // true, remove it
            // find index
            selection.splice(index, 1);
            this.setState({ tagSelection: selection });
        }else{
            // no index found, add tag
            // only 3 selections permitted
            if(selection.length < 3){
                selection.push(tag);
                this.setState({ tagSelection: selection });
            }else{
                // selection limited reached
            }
        }
    }

    handleCancelEdit = () => {
        this.setState({
            errorMessage: '',
            locationEdit: false,
            locationName: '',
            locationId: '',
        })
    }

    handleUpdateItem = async(e, updateItemMutation, oldLocation) => {
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

            // check if a location was selected
            if(this.state.locationEdit){
                // and the location changed
                if(oldLocation.name !== this.state.locationName){
                    variables.locationName = this.state.locationName;
                    variables.oldLocationId = oldLocation.id;
                    // if there's a locationId, an existing location was selected, so pass it aswell
                    if(this.state.locationId) variables.locationId = this.state.locationId;
                }
            } // else the location did not change, don't pass location

            // the tags were changed
            if(this.state.tagSelection){
                variables.tags = this.state.tagSelection.map(tag => tag.id)
            }
            //console.log('variables', variables);
            const res = await updateItemMutation({
                variables
            });
            //console.log('item updated', res);
        }
        // route to item
    }

    render(){
        return(
            <Query query={ SINGLE_ITEM_QUERY } variables={{id: this.props.id}}>
                {( { data, loading }) => {
                    if(loading) return <p>loading ...</p>
                    if(!data.item) return <p>No data found for id {this.props.id}</p>
                    //console.log('ran query', 'data', data);
                    return(
                        <Mutation 
                            mutation={ UPDATE_ITEM_MUTATION }
                            refetchQueries={[ { query: SINGLE_ITEM_QUERY, variables: {id: this.props.id} } ]}>
                            {(updateItem, {loading, error}) => (
                                <form onSubmit={e => this.handleUpdateItem(e, updateItem, data.item.location)}>
                                    <Error error={error} />
                                    {this.state.errorMessage && 
                                        <p>{this.state.errorMessage}</p>
                                    }
                                    <fieldset disabled={loading}>

                                        <button type="button" onClick={this.handleCancelEdit}>cancel edit</button>

                                        <img src={data.item.image} alt="upload preview" width="300" />

                                        { // if locationEdit is false, no changes were made, so use query data just to display
                                            !this.state.locationEdit &&
                                                <div>
                                                    location: 
                                                    {data.item.location.name} - {data.item.location.country.name} 
                                                    <button type="button" onClick={this.handleLocationEdit}>&times;</button>
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


                                        {
                                            // if there's no state.tagSelection, show current database tags + edit button
                                            !this.state.tagSelection && 
                                                <div>
                                                    tags: {data.item.tags.length === 0 ? 'no tags' : null} 
                                                    {data.item.tags.map(tag => <div key={tag.id}>{tag.name}</div>)}
                                                    <button type="button" onClick={(e) => {
                                                        e.preventDefault();
                                                        this.handleEditTags(data.item.tags);
                                                    }}>edit tags</button>
                                                </div>
                                        }
                                        {
                                            // if there is a state.tagSelection, show the ManageTags component
                                            this.state.tagSelection && 
                                                <ManageTags 
                                                    selection={this.state.tagSelection}
                                                    handleTagSelection={this.handleTagSelection}
                                                    loading={this.state.loading}
                                                    handleLoading={this.handleLoading}/>
                                        }

                                        <button disabled={this.state.loading}>save changes</button>

                                    </fieldset>
                                </form>
                            )}
                        </Mutation>
                    )
                }}
            </Query>
        )
    }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION, SINGLE_ITEM_QUERY };