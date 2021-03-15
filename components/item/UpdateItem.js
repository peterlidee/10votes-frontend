import { useState } from 'react';
import PropTypes from 'prop-types'
import Router from 'next/router';

import { useQuery, useMutation, gql } from '@apollo/client';
import { USER_ITEMS_QUERY } from '../context/UserItemsContext';
import { SINGLE_ITEM_QUERY } from '../SingleItem';

import MetaTitle from '../snippets/MetaTitle';
import Loader from '../snippets/Loader';
import Error from '../snippets/Error';
import FormRow from '../formParts/FormRow';
import InputSuggestion from './InputSuggestion';
import FormButton from '../formParts/FormButton';
import { inputToString } from '../../lib/inputToString';


const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
        $id: ID!
        $location: String
        $newTagNames: [String]
        $oldTagNames: [String]
        $oldTagIds: [ID!]
    ){
        updateItem(
            id: $id
            location: $location
            newTagNames: $newTagNames
            oldTagNames: $oldTagNames
            oldTagIds: $oldTagIds
        ){
            id
        }
    }
`;

// what we need to do first, in a seperate component, is:
// 1. check if there's an ID
// 2. check if the ID is an actual image
// 3. check if the user owns this image (userItems contains props.itemId)
function UpdateItemGate(props){
    // gate the component if no id was given
    if(!props.itemId) return <p className="no-data">You need to query a picture.</p>;
    const { loading, error, data } = useQuery(SINGLE_ITEM_QUERY, {
        variables: { itemId: props.itemId }
    });
    if(loading) return <Loader containerClass="items-loader" />
    if(error)   return <Error error={error} />
    // check if there is an item ( data: { item: null } )
    if(!data || !data.item) return <p className="no-data">No picture found.</p>

    // check if the user owns this item
    const isItemInUsersItems = props.userItems.find(userItem => userItem.id == props.itemId);
    if(!isItemInUsersItems) return <p className="no-data">You can only edit your own items!</p> 

    return(
        <>
            <MetaTitle>Edit item</MetaTitle>
            <h2 className="item-crud__title title">Edit your picture</h2>
            <UpdateItemComponent item={data.item} />
        </>
    )
}
UpdateItemGate.propTypes = {
    itemId: PropTypes.string.isRequired,
}

function UpdateItemComponent(props){
    // state
    const [location, setLocation] = useState('')
    const [locationEdit, setLocationEdit] = useState(false)
    const [tags, setTags] = useState([null, null, null])
    const [tagsEdit, setTagsEdit] = useState([false, false, false])
    // mutation, we pass variables as we call the mutation
    const [updateItem, { loading, error }] = useMutation( UPDATE_ITEM_MUTATION, {
        refetchQueries: [
            { query: SINGLE_ITEM_QUERY, variables: { itemId: props.item.id } },
            { query: USER_ITEMS_QUERY }
        ]
    })

    // the function makes the form inputs controlled inputs
    // the form inits with the data from SINGLE_ITEM_QUERY
    // when a change is made, it flips a boolean and the change is stored in state
    const handleSetState = (newState, index = null) => {
        // if there is a location value?
        if( newState.location || newState.location == '' ){ // TODO: do we need locationEdit????
            setLocation(newState.location);
            setLocationEdit(true);
        }
        // if there is a tag value
        if( index ){
            const tagsCopy = [...tags];
            const tagsEditCopy = [...tagsEdit]
            tagsCopy[index] = newState.tag;
            tagsEditCopy[index] = true;
            setTags(tagsCopy);
            setTagsEdit(tagsEditCopy);
        }
    }
    // called by cancel all changes button, next to submit
    const handleCancelEdit = () => {
        setLocation("");
        setLocationEdit(false);
        setTags([null, null, null]);
        setTagsEdit([false, false, false]);
    }

    const handleUpdateItem = async() => {

        // construct the variables
        let variables = {
            id: props.item.id,
        };

        // handle the location
        const locationCleanedUp = inputToString(location);
        // if location was edited, and it's not empty, and it's not the same as the old location pass it as variable
        if(locationEdit && locationCleanedUp && locationCleanedUp.toLowerCase() !== props.item.location.name.toLowerCase()){
            variables.location = locationCleanedUp;
        }

        // handle the tags
        // if there were old tags, pass the names and the ids of the old tags
        if(props.item.tags.length > 0){
            variables.oldTagNames = props.item.tags.map(oldTag => oldTag.name);
            variables.oldTagIds = props.item.tags.map(oldTag => oldTag.id);
        }
        const newTagNames = [];
        // check if there were changes in tagsEdit
        tagsEdit.map((tagEdit, i) => {
            if(tagEdit){
                // there were changes to this tag
                // the field may be null cause a tag is to be removed
                newTagNames.push(inputToString(tags[i]))
            } else { 
                // else, no changes in tags[i]
                // if there's an oldTagName, push that (so we know it's unchanged), else do nothing
                if(props.item.tags[i]){
                    newTagNames.push(props.item.tags[i].name)
                }
            }
        });
        if(newTagNames.length > 0) variables.newTagNames = newTagNames;

        // only call mutations when changes are in variables
        if(locationEdit || tagsEdit.includes(true)){
            //console.log('calling mutation with vars', variables);
            const res = await updateItem({
                variables
            }).catch(error => {
                console.log(error.message);
            });
            // route the user to the youritems page, just edited
            if(res.data){
                Router.push({
                    pathname: '/youritems',
                });
            }// else, don't route, there was an error, stay on page
        }else{ // no changes made, route them back to youritems page
            Router.push({
                pathname: '/youritems',
            });
        }

    } // close handleUpdateItem

    // check if form is valid to pass to formRow
    // in this case if there's a location cause tags are optional and image is non editable
    const formValid = locationEdit ? location && location.length >= 2 ? true : false: true;

    return(
        <form 
            onSubmit={e => {
                e.preventDefault()
                handleUpdateItem();
            }} 
            id="updateItemForm" 
            className="form-part form-part--update-item">

            <FormRow 
                number={1}
                valid={{ 
                    field: true, 
                    form: true,
                }}
            >
                <img src={props.item.image} alt="upload preview" className="manage-upload__image-preview" />
                <div className="crud-message">You cannot edit the image.</div>
                
            </FormRow>

            <FormRow 
                number={2}
                label={{ 
                    text: "Location (BE only for now)", 
                    required: true,
                    html: true,
                    for: "input-suggestion__location",
                }}
                valid={{
                    // if the location was edited, then validate location, else it's from DB and valid by default
                    field: formValid, 
                    form: formValid,
                }}
            >
                <InputSuggestion 
                    handleSetState={handleSetState}
                    // use the DB version, edited version
                    value={locationEdit ? location : props.item.location.name}
                    type="locations" 
                    id="location" />
            </FormRow>

            <FormRow 
                number={3}
                label={{ 
                    text: "Tag(s)", 
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
                        // if the current tags[i] was edited, pass it, 
                        //if not, see if there was an item from DB data.items.tag[i] and use that 
                        //or "" if there was no tag in db
                        value={tagsEdit[i] ? tags[i] : props.item.tags[i] ? props.item.tags[i].name : ""}
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
                <FormButton loading={loading} formValid={!formValid}>save changes</FormButton>
                {// only show cancel button when changes were made
                (locationEdit || tagsEdit.find(item => item)) &&
                    <>
                        or <button type="button" onClick={handleCancelEdit} className="crud__cancel-button" disabled={loading}>cancel all changes</button>
                    </>
                }
            </FormRow>

        </form>
    )
}

UpdateItemComponent.propTypes = {
    item: PropTypes.object.isRequired,
}

export default UpdateItemGate;