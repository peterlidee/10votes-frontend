import { useEffect, useState } from "react";
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



function SearchCreateType(props){
    // set state to neutral value
    const [value, setValue] = useState("");

    // setup create mutation
    const query = {
        locations: CREATE_LOCATION_MUTATION,
        //tags: CREATE_TAG_MUTATION,
        //users // create user not possible
    }
    // setup variables
    let variables = {}
    if(props.type == "locations"){
        variables.name = value;
        variables.countryCode = "be";
    }
    const [ createType, { loading, error, data }] = useMutation(query[props.type], { variables: variables });

    // onchange handler
    const handleSetState = (newState, index) => {
        setValue(newState[props.type]);
    }

    // 2 cases: 
    // [1] either the user selects an existing item from dropdown and we route to the edit [props.type] value page
    // or the user clicks create new [props.type] and we route to the edit [props.type] new value page
    
    // onselect handler [1]
    const handleSelection = (newState) => {
        console.log('newState',newState)
        setValue(newState[props.type]);
        // //redirect to the selected item
        Router.push({
            pathname: `/admin/${props.type}`,
            query: { [props.type.slice(0,-1)]: newState[props.type] },
        });
    }

    // on submit handler [2]
    // make create type mutation (only for location and tag)
    // on succesfull mutation, redirect to newly created type edit page
    const handleSubmit = async(e)=> {
        e.preventDefault();
        const res = await createType().catch(error => console.log(error.message));
        // there was an error
        if(!res) return null;
        //redirect to the created type edit page, with id as query param ?id=123456
        Router.push({
            pathname: `/admin/${props.type}`,
            query: { id: res.data[`create${capitalizeString(props.type).slice(0,-1)}`].id },
        });
    }

    const formValid = value && value.length >= 2;
    return(
        <div>
            <h2 className="item-crud__title title title--admin">Find or create {props.type}</h2>

            <form 
                onSubmit={handleSubmit} 
                id={`searchCreate${props.type}Form`}
                className="form-part form-part--searchCreateType"
            >

                <FormRow 
                    number={1}
                    label={{ 
                        text: `Enter a ${props.type.slice(0,-1)}`, 
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

                {error && (
                    <FormRow valid={{ error: true, form: formValid }}>
                        <Error error={error} plain={true} />
                    </FormRow>
                )}

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

            </form>


        </div>
    )
}

export default SearchCreateType;