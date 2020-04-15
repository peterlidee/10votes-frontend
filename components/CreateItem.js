import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Error from './Error';
import ManageTags from './ManageTags';
import ManageLocation from './ManageLocation';
import { CURRENT_USER_QUERY } from './User';

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

class CreateItem extends Component{
    state = {
        image: '12345.jpg',
        largeImage: '',
        loading: false,
        locationName: '',
        locationId: '',
        errorMessage: "",
        tags: [
            {name: "", id: ""},
            {name: "", id: ""},
            {name: "", id: ""},
        ],
    }

    uploadFile = async (e) => {
        this.handleLoading(true);
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', '10votes');
        const res = await fetch('https://api.cloudinary.com/v1_1/diidd5fve/image/upload', {
            method: 'POST',
            body: data
        });
        const file = await res.json();
        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url
        });
        this.handleLoading(false);
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
    handleCancelAll = () => {
        this.setState({
            image: "",
            largeImage: "",
            errorMessage: "",
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
            <Mutation mutation={ CREATE_ITEM_MUTATION } refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
                {(createItem, {loading, error}) => (
                    <form onSubmit={ e => this.handleCreateItem(e, createItem) }>
                        {this.state.errorMessage && 
                            <p>{this.state.errorMessage}</p>
                        }
                        <Error error={error} />
                        <fieldset disabled={loading}>
                            {this.state.image == '' &&
                                <label htmlFor="file">
                                    Image
                                    <input type="file" id="file" name="file" placeholder="upload an image" onChange={this.uploadFile} required />    
                                    {this.state.loading && <p>...loading image</p>}
                                </label>
                            }

                            {this.state.image && 
                                <>
                                    <button type="button" onClick={this.handleCancelAll}>&times; cancel</button>
                                    
                                    <img src={this.state.image} alt="upload preview" width="300" />
        
                                    <ManageLocation 
                                        handleLocationSelection={this.handleLocationSelection}
                                        handleLocationChange={this.handleLocationChange}
                                        locationName={this.state.locationName}
                                        locationId={this.state.locationId}
                                    />

                                    <ManageTags 
                                        tags={this.state.tags}
                                        handleTagChange={this.handleTagChange}
                                        handleTagSelection={this.handleTagSelection}
                                    />

                                    <button disabled={this.state.loading}>submit</button>

                                </>
                            }

                        </fieldset>
                    </form>
                )}
            </Mutation>
        )
    }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };