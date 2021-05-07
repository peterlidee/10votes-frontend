import { useState } from "react";
import Router from 'next/router';
import { gql, useMutation } from "@apollo/client";

import capitalizeString from "../../lib/capitalizeString";
import FormRow from "../formParts/FormRow"
import InputSuggestion from "../item/InputSuggestion"
import FormButton from "../formParts/FormButton"
import Error from "../snippets/Error";

const CREATE_LOCATION_MUTATION = gql`
    mutation CREATE_LOCATION_MUTATION($name: String!, $countryCode: String!){
        createLocation(name: $name, countryCode: $countryCode){
            id
            name
            slug
            country{
                id
                name
                countryCode
            }
        }
    }
`;

const CREATE_TAG_MUTATION = gql`
    mutation CREATE_TAG_MUTATION($name: String!){
        createTag(name: $name){
            id
            name
            slug
        }
    }
`;

function SearchCreateType(props){
    // set state to neutral value
    const [value, setValue] = useState("");

    // for users: we don't allow the creation of a user,
    // but, since this is a multi functional component 
    // and you can't put useMutation in a conditional
    // we load it with 'wrong' data, which is fine-ish since we don't use it 
    // setup create mutation
    const query = {
        locations: CREATE_LOCATION_MUTATION,
        tags: CREATE_TAG_MUTATION,
        users: CREATE_TAG_MUTATION, // create user not possible
    }
    // setup variables
    const variables = {
        locations: { name: value, countryCode: "be" },
        tags: { name: value },
        // create user not possible, but we pass empty object
        users: {},
    }
    const [ createType, { loading, error, data }] = useMutation(query[props.type], { variables: variables[props.type] });

    // onchange handler
    const handleSetState = (newState, index) => {
        setValue(newState[props.type]);
    }

    // 2 cases: 
    // [1] either the user selects an existing item from dropdown and we route to the edit [props.type] value page
    // [2] or the user clicks create new [props.type] and we route to the edit [props.type] new value page
    
    // onselect handler [1]
    const handleSelection = (newState) => {
        setValue(newState[props.type]);
        // //redirect to the selected item
        Router.push({
            pathname: `/admin/${props.type.slice(0,-1)}`,
            query: { id: newState.id },
        });
    }

    // on submit handler [2]
    // make create type mutation (only for location and tag)
    // on succesfull mutation, redirect to newly created type edit page
    // we disable the mutation call for users
    // (might get call on enter)
    const handleSubmit = async(e)=> {
        e.preventDefault();
        if(props.type == 'users') return;
        const res = await createType().catch(error => console.log(error.message));
        // there was an error
        if(!res) return null;
        //redirect to the created type edit page, with id as query param ?id=123456
        Router.push({
            pathname: `/admin/${props.type.slice(0,-1)}`,
            query: { id: res.data[`create${capitalizeString(props.type).slice(0,-1)}`].id },
        });
    }

    const formValid = value && value.length >= 2;
    return(
        <div className="admin-dashboard__search-create-section">
            <h2 className="item-crud__title title">Find {props.type != "users" && "or create"} {props.type}</h2>
            <form 
                onSubmit={handleSubmit} 
                id={`searchCreate${props.type}Form`}
                className="form-part form-part--searchCreateType"
            >

                <FormRow 
                    number={1}
                    label={{ 
                        text: props.type == 'users' ? 'Find users' : `Enter a ${props.type.slice(0,-1)}`,
                        required: true,
                        html: true,
                        for: "input-suggestion__locations--1",
                    }}
                    valid={{ 
                        field: formValid, 
                        form: formValid,
                    }}
                >
                    <InputSuggestion
                        value={value}
                        index={-1} 
                        type={props.type} 
                        required={true}
                        handleSetState={handleSetState} 
                        handleSelection={handleSelection} />

                </FormRow>

                {(props.type == 'tags' || props.type == 'locations') &&
                error && (
                    <FormRow valid={{ error: true, form: formValid }}>
                        <Error error={error} plain={true} />
                    </FormRow>
                )}

                {(props.type == 'tags' || props.type == 'locations') &&
                    <FormRow 
                        number={2}
                        extraClass="last" 
                        valid={{ 
                            field: formValid, 
                            form: formValid,
                        }}
                    >
                        <FormButton loading={loading} formValid={!formValid}>create a new {props.type.slice(0,-1)}</FormButton>
                    </FormRow>
                }

                {props.type == "users" &&
                    <FormRow 
                        number={"!"}
                        extraClass="last" 
                        valid={{ 
                            field: true, 
                            form: formValid,
                        }}
                    >
                        <div className="crud-message">You can only search, not create users.</div>
                    </FormRow>
                }                              

            </form>
        </div>
    )
}

export default SearchCreateType;