import FormRow from "../formParts/FormRow"
import FormButton from "../formParts/FormButton"

function SearchCreateType(props){
    return(
        <div>
            <h2 className="item-crud__title title">Find or create a {props.type}</h2>

            <form 
                //onSubmit={handleSubmit} 
                //id="createItemForm" 
                className="form-part form-part--searchCreateType"
            >

                <FormRow 
                    number={1}
                    label={{ 
                        text: `Enter a ${props.type}`, 
                        required: true,
                        html: true,
                        //for: "input-suggestion__location",
                    }}
                    valid={{ 
                        //field: location && location.length >= 2, 
                        //form: formValid,
                        field: false,
                        form: false,
                    }}
                >
                    {/*<InputSuggestion 
                        handleSetState={handleSetState} 
                        value={location}
                        type="locations" 
                        id="location" />*/}
                    <input />
                </FormRow>

                {/*error && 
                    <FormRow valid={{ error: true, form: formValid }}>
                        <Error error={error} plain={true} />
                    </FormRow>
                */}

                <FormRow 
                    number={2}
                    extraClass="last" 
                    valid={{ 
                        // field: formValid, 
                        // form: formValid,
                        field: false, 
                        form: false,
                    }}
                >
                    <FormButton loading={false} formValid={false}>create new {props.type}</FormButton>
                </FormRow>                                  

            </form>


        </div>
    )
}

export default SearchCreateType;