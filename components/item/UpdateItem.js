import { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import { useQuery, useMutation } from '@apollo/client'
import { SINGLE_ITEM_QUERY, USER_ITEMS_QUERY } from '../../queriesAndMutations/items/itemQueries'
import { UPDATE_ITEM_MUTATION } from '../../queriesAndMutations/items/itemMutations'
import UserContext from '../context/UserContext'

import MetaTitle from '../snippets/MetaTitle'
import Loader from '../snippets/Loader'
import Error from '../snippets/Error'
import NoData from '../snippets/NoData'
import FormRow from '../formParts/FormRow'
import InputSuggestion from './InputSuggestion'
import FormButton from '../formParts/FormButton'
import { inputToString } from '../../lib/helpers'
import DeleteItem from './DeleteItem'


// we need to check if current user is admin to grant them permission
function IsAdminGate(props){
    // no loading or error, gets handled prior in other components
    const { data: userData } = useContext(UserContext);
    const isAdmin = userData?.me.permissions.includes('ADMIN');
    return <UpdateItemGate {...props} isAdmin={isAdmin} />
}

// what we need to do first, in a seperate component, is:
// 1. check if there's an ID
// 2. check if the ID is an actual image
// 3. check if the user owns this image (userItems contains props.itemId)
function UpdateItemGate(props){
    // gate the component if no id was given
    if(!props.itemId) return <NoData>You need to query a picture.</NoData>;
    const { loading, error, data } = useQuery(SINGLE_ITEM_QUERY, {
        variables: { itemId: props.itemId },
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-only",
    });
    if(loading) return <Loader containerClass="items-loader" />
    if(error)   return <Error error={error} />
    // check if there is an item ( data: { item: null } )
    if(!data || !data.item) return <NoData>No picture found.</NoData>

    // check if the user owns this item or user is admin
    const ownsItem = props.userItems.findIndex(userItem => userItem.id == props.itemId) >= 0;
    if(!ownsItem && !props.isAdmin) return <NoData>You can only edit your own items!</NoData> 

    return(
        <>
            <MetaTitle>Edit item</MetaTitle>
            <div className="update-item__header">
                <h2 className="item-crud__title title">Edit {!props.isAdmin && 'your'} picture</h2>
                <DeleteItem id={props.itemId} isAdmin={props.isAdmin} ownsItem={ownsItem} />
            </div>
            <UpdateItemComponent item={data.item} isAdmin={props.isAdmin} ownsItem={ownsItem} />
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
    // const [tags, setTags] = useState([null, null, null])
    const [tags, setTags] = useState(["", "", ""])
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
    const handleSetState = (newState, index = -1) => {
        // if there is a location value?
        if( newState.locations || newState.locations == '' ){
            setLocation(newState.locations);
            setLocationEdit(true);
        }
        // if there is a tag value
        if( index >= 0 ){
            const tagsCopy = [...tags];
            const tagsEditCopy = [...tagsEdit]
            tagsCopy[index] = newState.tags;
            tagsEditCopy[index] = true;
            setTags(tagsCopy);
            setTagsEdit(tagsEditCopy);
        }
    }
    // called by cancel all changes button, next to submit
    const handleCancelEdit = () => {
        setLocation("");
        setLocationEdit(false);
        setTags(["", "", ""]);
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
            const res = await updateItem({
                variables
            }).then(res => {
                if(res.data){
                    Router.back()
                }// else, don't route, there was an error, stay on page
            }).catch(error => console.log(error.message));

        }else{ // no changes made, route them back
            Router.back()
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
                    for: "input-suggestion__locations--1",
                }}
                valid={{
                    // if the location was edited, then validate location, else it's from DB and valid by default
                    field: formValid, 
                    form: formValid,
                }}
            >
                <InputSuggestion 
                    // use the DB version, edited version
                    value={locationEdit ? location : props.item.location.name}
                    index={-1}
                    type="locations" 
                    required={true}
                    handleSetState={handleSetState}
                    handleSelection={handleSetState} />
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
                        // if the current tags[i] was edited, pass it, 
                        // if not, see if there was an item from DB data.items.tag[i] and use that 
                        // or "" if there was no tag in db
                        value={tagsEdit[i] ? tags[i] : props.item.tags[i] ? props.item.tags[i].name : ""}
                        index={i}
                        type="tags" 
                        required={false}
                        handleSetState={handleSetState}
                        handleSelection={handleSetState} />
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
                <FormButton loading={loading} formValid={!formValid} isAdmin={props.isAdmin && !props.ownsItem}>save changes</FormButton>
                {// only show cancel button when changes were made
                (locationEdit || tagsEdit.find(item => item)) &&
                    <>
                        <span>or </span>
                        <button 
                            type="button" 
                            onClick={handleCancelEdit} 
                            className={`crud__cancel-button ${props.isAdmin ? 'crud__cancel-button--admin' : ''}`} 
                            disabled={loading}>
                                cancel all changes
                        </button>
                    </>
                }
            </FormRow>

        </form>
    )
}

UpdateItemComponent.propTypes = {
    item: PropTypes.object.isRequired,
}

export default IsAdminGate;