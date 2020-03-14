import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Error from './Error';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $image: String
        $largeImage: String
        $price: Int!
    ){
        createItem(
            title: $title
            description: $description
            image: $image
            largeImage: $largeImage
            price: $price
        ){
            id
        }
    }
`;

class CreateItem extends Component{
    state = {
        title: '',
        description: '',
        image: '',
        largeImage: '',
        price: 0,
        imageLoading: false,
    }
    handleChange = (e) => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({
            [name] : val
        })
    }
    uploadFile = async (e) => {
        this.setState({ imageLoading: true });
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', '10votes');
        
        const res = await fetch('https://api.cloudinary.com/v1_1/diidd5fve/image/upload', {
            method: 'POST',
            body: data
        });
        //console.log('res', res);
        const file = await res.json();
        //console.log('file', file);
        this.setState({
            imageLoading: false,
            image: file.secure_url,
            largeImage: file.eager[0].secure_url
        });

    }
    render(){
        return(
            <Mutation mutation={ CREATE_ITEM_MUTATION } variables={this.state}>
                {(createItem, {loading, error}) => (
                    <form onSubmit={ async (e) => {
                        // stop the form from submitting
                        e.preventDefault();
                        // call the mutation
                        const res = await createItem();
                        // change them to the single item page
                        //console.log(res);
                        Router.push({
                            pathname: '/item',
                            query: { id: res.data.createItem.id },
                        })
                    }}>
                        <Error error={error} />
                        <fieldset disabled={loading || this.state.imageLoading}>
                            <label htmlFor="file">
                                Image
                                <input type="file" id="file" name="file" placeholder="upload an image" onChange={this.uploadFile} required />
                                {this.state.image && <img src={this.state.image} alt="upload preview" width="200" />}
                            </label>
                            {this.state.imageLoading && <p>...loading image</p>}
                            <label htmlFor="title">
                                Title
                                <input type="text" id="title" name="title" placeholder="title" value={this.state.title} onChange={this.handleChange} required />
                            </label>
                            <label htmlFor="price">
                                Price
                                <input type="number" id="price" name="price" placeholder="price" value={this.state.price} onChange={this.handleChange} required />
                            </label>
                            <label htmlFor="description">
                                Description
                                <textarea id="description" name="description" placeholder="enter a description" value={this.state.description} onChange={this.handleChange} required />
                            </label>
                            <button>submit</button>
                        </fieldset>
                    </form>
                )}
            </Mutation>
        )
    }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };