import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Link from 'next/link';
import { CURRENT_USER_QUERY } from '../account/User';

import MetaTitle from '../snippets/MetaTitle';
import FormRow from '../formParts/FormRow';
import ManageUpload from './ManageUpload';
import InputSuggestion from './InputSuggestion';
import ErrorMessage from '../ErrorMessage';


// receives null or String, returns trimmed string or ""
function inputToString(input){
    if(!input) return '';
    return input.trim();
}

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


class CreateItem extends React.Component{
    state = {
        image: "https://res.cloudinary.com/diidd5fve/image/upload/v1598625542/10votes/fldeyu2ufrdtswkziqby.jpg",
        largeImage: "https://res.cloudinary.com/diidd5fve/image/upload/c_limit,h_1500,q_auto,w_1500/v1598625542/10votes/fldeyu2ufrdtswkziqby.jpg",
        
        //image: "",
        //largeImage: "",

        //loading: false,
        //locationName: '',
        //locationId: '',
        
        location: '',
        
        //errorMessage: "",
        /*tags: [
            {name: "", id: ""},
            {name: "", id: ""},
            {name: "", id: ""},
        ],*/
        tags: [null, null, null],
    }

    handleSetState = (newState, index = null) => {
        if(index){
            const stateCopy = [...this.state.tags];
            stateCopy[index] = newState.tag;
            this.setState({
                tags: stateCopy
            });
            return null;
        }
        this.setState({
            ...newState
        });
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
    handleCancelAll = (errorMessage = "") => {
        this.setState({
            image: "",
            largeImage: "",
            errorMessage: errorMessage,
            loading: false,
            locationName: "",
            locationId: "",
            tags: [
                {name: "", id: ""},
                {name: "", id: ""},
                {name: "", id: ""},
            ],
            tags2: ["","",""],
        });
    }

    handleCreateItem = async (e, createItem) => {
        e.preventDefault();
        // form validation: are the required fields filled in? TODO?

        // create the variables
        const variables = {
            image: this.state.image,
            largeImage: this.state.largeImage,
            location: inputToString(this.state.location),
            tags: this.state.tags.map(tag => inputToString(tag)).filter(tag => tag), //TODO
        }

        // call the mutation
        const res = await createItem({ variables })
            .catch(error => {
                console.log(error.message)
            });
        
        // there was an error
        if(!res) return null; 

        Router.push({
            pathname: '/item',
            query: { id: res.data.createItem.id },
        });
    }

    handleCreateItem2 = async (e, createItem) => {
        e.preventDefault();
        // form validation: are the required fields filled in? TODO?

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
        const res = await createItem({ variables })
            .catch(error => {
                console.log(error.message)
            });
        
        // there was an error
        if(!res) return null; 

        Router.push({
            pathname: '/item',
            query: { id: res.data.createItem.id },
        });
        
    }

    render(){
        // make a const to check if the form is all valid, used in CrudNumber
        const formValid = this.state.image && this.state.location && this.state.location.length >= 2;

        return(
            <Query query={CURRENT_USER_QUERY}>
                {({ data }) => (
                    // since this component if guarded by the please signin component, we don't need to worry about loading or error
                    <Mutation mutation={ CREATE_ITEM_MUTATION } refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
                        {(createItem, {loading, error}) => (
                            <>
                                <MetaTitle>Add an picture</MetaTitle>
                                <h2 className="item-crud__title title">Add a Picture</h2>
                                {data.me.items.length >= 10 && <p className="no-data">You used up all your uploads. Manage them here: <Link href="/myitems"><a>my pics</a></Link></p>}

                                <form onSubmit={ e => this.handleCreateItem(e, createItem) } id="createItemForm" className="form-part form-part--createItem">

                                    <ManageUpload 
                                        number={{ number: 1 }}
                                        label={{ 
                                            text: "Add an image", 
                                            required: true,
                                        }}
                                        valid={{ 
                                            field: this.state.image, 
                                            form: this.state.image 
                                        }}
                                        image={this.state.image}
                                        handleSetState={this.handleSetState} />

                                    <FormRow 
                                        number={{ number: 2 }}
                                        label={{ 
                                            text: "Add a location (BE only for now)", 
                                            required: true,
                                            html: true,
                                            for: "input-suggestion__location",
                                        }}
                                        valid={{ 
                                            field: this.state.location && this.state.location.length >= 2, 
                                            form: formValid,
                                        }}
                                    >
                                        <InputSuggestion 
                                            handleSetState={this.handleSetState} 
                                            value={this.state.location}
                                            type="locations" 
                                            id="location" />
                                    </FormRow>

                                    <FormRow 
                                        number={{ number: 3 }}
                                        label={{ 
                                            text: "Add tag(s)", 
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
                                                value={tag}
                                                type="tags" 
                                                id={`tag-${i}`} />
                                        ))}
                                    </FormRow>

                                    {error && 
                                        <FormRow valid={{ error: true, form: formValid }}>
                                            <ErrorMessage error={error} />
                                        </FormRow>
                                    }

                                    <FormRow 
                                        number={{ 
                                            number: 4, 
                                            extraClass: "last" 
                                        }}
                                        valid={{ 
                                            field: formValid, 
                                            form: formValid,
                                        }}
                                    >
                                        <button disabled={!formValid || loading} className="form-part__button">save</button>
                                    </FormRow>                                  

                                </form>
                            </>
                        )}
                    </Mutation>
                )}
            </Query>
        )
    }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };