import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import Link from 'next/link';

import MetaTitle from '../snippets/MetaTitle';
import Error from '../snippets/Error';
import FormRow from '../formParts/FormRow';
import InputContainer from '../formParts/InputContainer';
import FormButton from '../formParts/FormButton';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $password: String!){
        signup(email: $email, password: $password){
            id
            email
        }
    }
`;

class Signup extends React.Component{
    state = {
        password: "",
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
                mutation={SIGNUP_MUTATION} 
                variables={this.state}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
                {(signup, { called, loading, error, data }) => {
                    if(called && !error && !loading && data && data.signup){
                        return <p className="no-data">You are logged into your new account: {data.signup.email}.</p>
                    }
                    if(error){ // overwrite the bad UX graphQl error
                        if (error.message == "GraphQL error: A unique constraint would be violated on User. Details: Field name = email"){
                            console.log('state', this.state.email)
                            const calledEmail = this.state.email ? `The email: ${this.state.email}` : "This email";
                            error.message = `${calledEmail} is already taken.`;
                        }
                    }
                    return(
                        <>
                            <MetaTitle>Sign up for an account</MetaTitle>
                            <h2 className="title">Sign up for a new account</h2>

                            <form method="post" className="form-part form-part--account" onSubmit={async e => {
                                e.preventDefault();
                                // more form validation here
                                // this.validateForm()
                                const res = await signup().catch(error => console.log(error.message));
                                this.setState({ email: '', password: '' });
                            }}>

                                <FormRow 
                                    number={1}
                                    label={{ 
                                        text: "Email", 
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
                                            onChange= {this.saveToState}
                                        />
                                    </InputContainer>
                                </FormRow>

                                <FormRow 
                                    number={2}
                                    label={{ 
                                        text: "Password", 
                                        required: true,
                                        html: true,
                                        for: "password",
                                    }}
                                    valid={{ 
                                        field: this.state.password, 
                                        form: this.state.email && this.state.password,
                                    }}
                                >
                                    <InputContainer 
                                        clearField={this.clearField} 
                                        name="password" 
                                        isEmpty={!this.state.password}
                                    >
                                        <input 
                                            type="password" 
                                            minLength="6" 
                                            className="form-part__input"
                                            name="password"
                                            id="password"
                                            value={this.state.password}
                                            onChange={this.saveToState} 
                                        />
                                    </InputContainer>
                                </FormRow>

                                {error && 
                                    <FormRow valid={{ error: true, form: this.state.email && this.state.password }}>
                                        <Error error={error} plain={true} />
                                    </FormRow>
                                }

                                <FormRow 
                                    number={3}
                                    extraClass="last"
                                    valid={{ 
                                        field: this.state.email && this.state.password, 
                                        form: this.state.email && this.state.password,
                                    }}
                                >
                                    <FormButton loading={loading} formValid={!this.state.email || !this.state.password}>
                                        sign up
                                    </FormButton>
                                </FormRow>  
                                
                                <div className="form-part--account__links">
                                    <Link href="/login"><a className="form__link">Do you already have an account? Log in.</a></Link>
                                </div>
                            </form>
                        </>
                    )
                }}
            </Mutation>
        )
    }
}

export default Signup;