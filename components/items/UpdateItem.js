import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { CURRENT_USER_QUERY } from '../account/User';

import MetaTitle from '../snippets/MetaTitle';
import Loader from '../snippets/Loader';
import FormRow from '../formParts/FormRow';
import InputSuggestion from './InputSuggestion';
import { inputToString } from '../../lib/functions';
import FormButton from '../formParts/FormButton';
import Error from '../snippets/Error';


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

//TODO refetch queries on update??? me query?

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
        location: '',
        locationEdit: false,
        tags: [null, null, null],
        tagsEdit: [false, false, false],
    }

    handleSetState = (newState, index = null) => {
        if(index){
            // if there's an index, then the passed value is tags
            const tagsCopy = [...this.state.tags];
            const tagsEditCopy = [...this.state.tagsEdit];
            // put the new value into a copy of this.state.tags[i]
            tagsCopy[index] = newState.tag;
            // if there's also a tagsEdit value, update that one too
            if(newState.tagEdit) tagsEditCopy[index] = newState.tagEdit;
            this.setState({
                tags: tagsCopy,
                tagsEdit: tagsEditCopy,
            });
            return null;
        }
        this.setState({
            ...newState
        });
    }

    handleCancelEdit = () => {
        this.setState({
            location: '',
            locationEdit: false,
            tags: [null, null, null],
            tagsEdit: [false,false,false],
        })
    }

    handleUpdateItem = async(e, updateItemMutation, oldLocation, oldTags) => {
        e.preventDefault();

        // construct the variables
        let variables = {
            id: this.props.id,
        };

        // handle the location
        const location = inputToString(this.state.location);
        // if location was edited, and it's not empty, and it's not the same as the old location pass it as variable
        if(this.state.locationEdit && location && location.toLowerCase !== oldLocation.name.toLowerCase){
            variables.location = location;
        }
        
        // handle the tags
        // if there were old tags, pass the names and the ids of the old tags
        if(oldTags.length > 0){
            variables.oldTagNames = oldTags.map(oldTag => oldTag.name);
            variables.oldTagIds = oldTags.map(oldTag => oldTag.id);
        }
        const newTagNames = [];
        // check if there were changes in tagsEdit
        this.state.tagsEdit.map((tagEdit, i) => {
            if(tagEdit){
                // there were changes to this tag
                // the field may be null cause a tag is to be removed
                newTagNames.push(inputToString(this.state.tags[i]))
            } else { 
                // else, no changes in tags[i]
                // if there's an oldTagName, push that (so we know it's unchanged), else do nothing
                if(oldTags[i]){
                    newTagNames.push(oldTags[i].name)
                }
            }
        });
        if(newTagNames.length > 0) variables.newTagNames = newTagNames;

        // only call mutations when changes are in variables
        if(variables.location || this.state.tagsEdit.includes(true)){
            console.log('calling mutation with vars', variables);
            const res = await updateItemMutation({
                variables
            }).catch(error => {
                console.log(error.message);
            });
            // route the user to the single item page, just edited
            if(res.data){
                console.log('update res', res.data);
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

    render(){
        if(!this.props.id)return <p className="no-data">Invalid request.</p>;
        return(
            <>
            <MetaTitle>Edit item</MetaTitle>
            <h2 className="item-crud__title title">Edit your picture</h2>
            <Query 
                query={ SINGLE_ITEM_QUERY } 
                variables={{id: this.props.id}}
                fetchPolicy="cache-and-network"
            >
                {({ data, loading, error }) => {
                    if(loading) return <Loader containerClass="items-loader" />
                    if(error) return <Error error={error} />
                    if(!data.item) return <p className="no-data">No picture found.</p>
                    
                    return (
                        <Query query={ CURRENT_USER_QUERY } fetchPolicy="cache-and-network">
                            {({data: userData, loading: userLoading, error: userError}) => {
                                // as this component is inside a gated component, we don't need to worry about errors on the user query
                                // check if logged in user owns this item
                                if(userData.me.id !== data.item.user.id) return <p className="no-data">You can only edit your own items!</p>

                                return(
                                    <Mutation 
                                        mutation={ UPDATE_ITEM_MUTATION }
                                        refetchQueries={[
                                             { query: SINGLE_ITEM_QUERY, variables: {id: this.props.id} },
                                             { query: CURRENT_USER_QUERY },
                                        ]}
                                    >
                                        {(updateItem, { error, loading }) => {
                                            // check if form is valid to pass to formRow
                                            // in this case if there's a location cause tags are optional and image is non editable
                                            const formValid = this.state.locationEdit ? this.state.location && this.state.location.length >= 2 ? true : false: true;
                                            
                                            return(
                                                <form 
                                                    onSubmit={e => this.handleUpdateItem(e, updateItem, data.item.location, data.item.tags)} 
                                                    id="updateItemForm" 
                                                    className="form-part form-part--update-item">

                                                    <FormRow 
                                                        number={1}
                                                        valid={{ 
                                                            field: true, 
                                                            form: true,
                                                        }}
                                                    >
                                                        <img src={data.item.image} alt="upload preview" className="manage-upload__image-preview" />
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
                                                            // if the location was edited, then validate this.state.location, else it's from DB and valid by default
                                                            field: formValid, 
                                                            form: formValid,
                                                        }}
                                                    >
                                                        <InputSuggestion 
                                                            handleSetState={this.handleSetState}
                                                            // use the DB version, edited version
                                                            value={this.state.locationEdit ? this.state.location : data.item.location.name}
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
                                                        {this.state.tags.map((tag, i) => (
                                                            <InputSuggestion 
                                                                key={i}
                                                                handleSetState={this.handleSetState} 
                                                                // if the current tags[i] was edited, pass it, if not, see if there was an item from DB data.items.tag[i] and use that or null if there was no tag in db
                                                                value={this.state.tagsEdit[i] ? this.state.tags[i] : data.item.tags[i] ? data.item.tags[i].name : null}
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
                                                        (this.state.locationEdit || this.state.tagsEdit.find(item => item)) &&
                                                            <>
                                                                or <button type="button" onClick={this.handleCancelEdit} className="crud__cancel-button" disabled={loading}>cancel all changes</button>
                                                            </>
                                                        }
                                                    </FormRow>  
                                                </form>
                                        )}}
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