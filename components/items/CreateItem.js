import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Link from 'next/link';
import { CURRENT_USER_QUERY } from '../account/User';

import { inputToString } from '../../lib/functions';
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

class CreateItem extends React.Component{
    state = {
        //image: "https://res.cloudinary.com/diidd5fve/image/upload/v1598625542/10votes/fldeyu2ufrdtswkziqby.jpg",
        //largeImage: "https://res.cloudinary.com/diidd5fve/image/upload/c_limit,h_1500,q_auto,w_1500/v1598625542/10votes/fldeyu2ufrdtswkziqby.jpg",
        image: "",
        largeImage: "",
        location: '',
        tags: [null, null, null],
        // tagsEdit or locationEdit of no use here, doesn't get called so we don't bother
    }

    // get called from children to set this.state
    // if there's an index, it means we're setting this.state.item[i]
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
                                <MetaTitle>Upload a picture</MetaTitle>
                                <h2 className="item-crud__title title">Upload a Picture</h2>
                                {data.me.items.length >= 10 && <p className="no-data">You used up all your uploads. Manage them here: <Link href="/youritems"><a>my pics</a></Link></p>}

                                {data.me.items.length < 10 &&

                                    <form 
                                        onSubmit={ e => this.handleCreateItem(e, createItem) } 
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
                                                field: this.state.image, 
                                                form: this.state.image 
                                            }}
                                            image={this.state.image}
                                            handleSetState={this.handleSetState} />

                                        <FormRow 
                                            number={2}
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
                        )}
                    </Mutation>
                )}
            </Query>
        )
    }
}

export default CreateItem;