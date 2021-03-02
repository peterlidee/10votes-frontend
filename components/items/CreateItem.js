import { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { gql, useMutation } from '@apollo/client';

import { USER_ITEMS_QUERY } from '../context/UserItemsContext';
import { inputToString } from '../../lib/inputToString';
import MetaTitle from '../snippets/MetaTitle';
import FormRow from '../formParts/FormRow';
import ManageUpload from './ManageUpload';
import InputSuggestion from './InputSuggestion';
import FormButton from '../formParts/FormButton';
import Error from '../snippets/Error';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $image: String
        $largeImage: String
        $location: String
        $tags: [String!]!
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
                items{
                    id
                }
            }
        }
    }
`;

// TODO: why are we asking for location?

function CreateItem(props){
    // state hooks
    const [image, setImage] = useState('');
    const [largeImage, setLargeImage] = useState('');
    const [location, setLocation] = useState('');
    const [tags, setTags] = useState([null, null, null]);

    const handleSetState = (newState, index = null) => {
        // console.log('res from child comps', newState)
        // the manageUpload component returns { small: url, large: url }
        // so we know to set the image and largeImage when there's a small property
        if(newState.small || newState.small == ''){
            setImage(newState.small);
            setLargeImage(newState.large);
        }
        if(newState.location || newState.location == ''){
            setLocation(newState.location);
        }
        if(newState.tag || newState.tag == ''){
            const tagsCopy = [...tags];
            tagsCopy[index] = newState.tag;
            setTags(tagsCopy);
        }
    }

    // setup createItem mutation
    const [createItem, { loading, error }] = useMutation(CREATE_ITEM_MUTATION, {
        variables: {
            image, 
            largeImage,
            location: inputToString(location),
            // filter out the empty ones
            tags: tags.map(tag => inputToString(tag)).filter(tag => tag),
        },
        refetchQueries: [{ query: USER_ITEMS_QUERY }],
    });

    // function to handle submit and call createItem mutation
    const handleSubmit = async(e) => {
        e.preventDefault();
        // form validation: are the required fields filled in? TODO?
        // call the mutation
        const res = await createItem().catch(error => console.log(error.message));
        // there was an error
        if(!res) return null; 
        //redirect to the created item
        Router.push({
            pathname: '/item',
            query: { id: res.data.createItem.id },
        });
    }

    // make a const to check if the form is all valid, used in CrudNumber
    const formValid = image && location && location.length >= 2;

    return(
        <>
            <MetaTitle>Upload a picture</MetaTitle>
            <h2 className="item-crud__title title">Upload a Picture</h2>
            {props.userItems.length >= 10 && <p className="no-data">You used up all your uploads. Manage them here: <Link href="/youritems"><a>my pics</a></Link></p>}

            {props.userItems.length < 10 &&

                <form 
                    onSubmit={handleSubmit} 
                    id="createItemForm" 
                    className="form-part form-part--createItem"
                >

                    <ManageUpload 
                        number={1}
                        label={{ 
                            text: "Add an image", 
                            required: true,
                        }}
                        valid={{ 
                            field: image, 
                            form: image 
                        }}
                        image={image}
                        handleImageSelection={handleSetState}
                    />

                    <FormRow 
                        number={2}
                        label={{ 
                            text: "Add a location (BE only for now)", 
                            required: true,
                            html: true,
                            for: "input-suggestion__location",
                        }}
                        valid={{ 
                            field: location && location.length >= 2, 
                            form: formValid,
                        }}
                    >
                        <InputSuggestion 
                            handleSetState={handleSetState} 
                            value={location}
                            type="locations" 
                            id="location" />
                    </FormRow>

                    <FormRow 
                        number={3}
                        label={{ 
                            text: "Add tag(s)", 
                            required: false,
                        }}
                        valid={{ 
                            field: true, 
                            form: formValid,
                        }}
                    >
                        {tags.map((tag, i) => (
                            <InputSuggestion 
                                key={i}
                                handleSetState={handleSetState} 
                                value={tag || ""}
                                type="tags" 
                                id={`tag-${i}`} />
                        ))}
                    </FormRow>

                    {error && 
                        <FormRow valid={{ error: true, form: formValid }}>
                            <Error error={error} plain={true} />
                        </FormRow>
                    }

                    <FormRow 
                        number={4}
                        extraClass="last" 
                        valid={{ 
                            field: formValid, 
                            form: formValid,
                        }}
                    >
                        <FormButton loading={loading} formValid={!formValid}>save</FormButton>
                    </FormRow>                                  

                </form>
            }
        </>
    )
}

export default CreateItem;