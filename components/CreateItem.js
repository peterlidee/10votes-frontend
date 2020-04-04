import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Error from './Error';
import ManageTags from './tag/ManageTags';
import ManageLocation from './ManageLocation';
import { CURRENT_USER_QUERY } from './User';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $image: String
        $largeImage: String
        $locationName: String
        $locationId: ID
        $tags: [ID]!
    ){
        createItem(
            image: $image
            largeImage: $largeImage
            locationName: $locationName
            locationId: $locationId
            tags: $tags
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
        image: '1234.jpg',
        largeImage: '',
        loading: false,

        
        locationName: '',
        locationId: '',

        tagSelection: [],
        errorMessage: "",
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
            //locationSelection: location,
            errorMessage: "",
            locationName: location.name,
            locationId: location.id,
        })
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
            tagSelection: [],
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
                locationId: this.state.locationId,
                tags: this.state.tagSelection.map(tag => tag.id),
            }
            if(this.state.locationId){
                variables.locationId = this.state.locationId;
            }
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
                                        selection={this.state.tagSelection}
                                        handleTagSelection={this.handleTagSelection}
                                        loading={this.state.loading}
                                        handleLoading={this.handleLoading}
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