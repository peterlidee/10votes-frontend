import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import MetaTitle from '../snippets/MetaTitle';
import FormRow from '../formParts/FormRow';
import InputContainer from '../formParts/InputContainer';
import FormButton from '../formParts/FormButton';
import ErrorMessage from '../ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!){
        requestReset(email: $email){
            message
        }
    }
`;

class RequestReset extends React.Component{
    state = {
        email: "",
    }
    saveToState = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    clearField = (name) => {
        this.setState({
            [name]: ""
        });
    }
    render(){
        return(
            <Mutation 
                mutation={REQUEST_RESET_MUTATION} 
                variables={this.state}>
                {(requestReset, { loading, error, called }) => {
                    if(!error && !loading && called) return <p className="no-data">We sent an email with reset instructions to {this.state.email}.</p>
                    return(
                        <>
                            <MetaTitle>Request a password reset</MetaTitle>
                            <h2 className="title">Reset your password</h2>

                            <form method="post" className="form-part form-part--account" onSubmit={async e => {
                                    e.preventDefault();
                                    // more form validation here
                                    // this.validateForm()
                                    const res = await requestReset().catch(error => console.log(error.message));
                                    // reset to empty if pass was wrong
                                    if(!res){
                                        this.setState({ email: '' });
                                    }
                                    // don't reset if succes so we can use email in succes message
                            }}>

                                <FormRow 
                                    number={1}
                                    label={{ 
                                        text: "What email did you sign up with?", 
                                        required: true,
                                        html: true,
                                        for: "email",
                                    }}
                                    valid={{ 
                                        field: this.state.email, 
                                        form: this.state.email,
                                    }}
                                >
                                    <InputContainer 
                                        clearField={this.clearField} 
                                        name="email" 
                                        isEmpty={!this.state.email}
                                    >
                                        <input 
                                            type="email" 
                                            className="form-part__input"
                                            name="email"
                                            id="email"
                                            value={this.state.email}
                                            onChange={this.saveToState}
                                        />
                                    </InputContainer>
                                </FormRow>

                                {error && 
                                    <FormRow valid={{ error: true, form: this.state.email }}>
                                        <ErrorMessage error={error} />
                                    </FormRow>
                                }

                                <FormRow 
                                    number={2}
                                    extraClass="last"
                                    valid={{ 
                                        field: this.state.email, 
                                        form: this.state.email,
                                    }}
                                >
                                    <FormButton loading={loading} formValid={!this.state.email}>
                                        request reset
                                    </FormButton>
                                </FormRow>  
                            </form>
                        </>
                    )
                }}
            </Mutation>
        )
    }
}

export default RequestReset;