import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Error from './Error';
import ManageTags from './tag/ManageTags';
import ManageLocation from './location/ManageLocation';
import { CURRENT_USER_QUERY } from './User';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $image: String
        $largeImage: String
        $location: ID!
        $tags: [ID]!
    ){
        createItem(
            image: $image
            largeImage: $largeImage
            location: $location
            tags: $tags
        ){
            id
            location{
                id
                itemCount
            }
        }
    }
`;

class CreateItem extends Component{
    state = {
        image: '123.jpg',
        largeImage: '',
        loading: false,
        locationSelection: {},
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

    handleLocationSelection = (location) => {
        this.setState({
            locationSelection: location,
            errorMessage: "",
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
            locationSelection: {},
            tagSelection: [],
        });
    }

    render(){
        return(
            <Mutation mutation={ CREATE_ITEM_MUTATION } variables={{
                image: this.state.image,
                largeImage: this.state.largeImage,
                location: this.state.locationSelection.id ? this.state.locationSelection.id : null,
                tags: this.state.tagSelection.map(tag => tag.id),
            }}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
                {(createItem, {loading, error}) => (
                    <form onSubmit={ async (e) => {
                        // stop the form from submitting
                        e.preventDefault();
                        // form validation: are the required fields filled in?
                        if(!this.state.locationSelection.name){
                            this.setState({ errorMessage: "Please add a location!" });
                        }else{
                            // call the mutation
                            const res = await createItem();
                            console.log('frontend res', res);
                            // change them to the single item page
                            Router.push({
                                pathname: '/item',
                                query: { id: res.data.createItem.id },
                            });
                        }
                    }}>
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
                                        selection={this.state.locationSelection}
                                        handleLocationSelection={this.handleLocationSelection}
                                        loading={this.state.loading}
                                        handleLoading={this.handleLoading}
                                    />

                                    <ManageTags 
                                        selection={this.state.tagSelection}
                                        handleTagSelection={this.handleTagSelection}
                                        loading={this.state.loading}
                                        handleLoading={this.handleLoading}
                                    />

                                    {
                                        // only show submit if location is filled in
                                        this.state.locationSelection.name && 
                                            <button disabled={this.state.loading}>submit</button>
                                    }

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