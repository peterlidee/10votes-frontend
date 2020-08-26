import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import Link from 'next/link';

import NewError from '../NewError';
import MetaTitle from '../snippets/MetaTitle';
import Loader from '../snippets/Loader';
import LabelAndInput from './LabelAndInput';


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
        focus: "",
    }
    saveToState = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    focusInput = (e) => {
        this.setState({
            focus: e.target.name
        })
    }
    blurInput = () => {
        this.setState({ focus: "" })
    }
    render(){
        // we spread these into the LabelAndInput component so we don't have to type it everty time
        const spread = { 
            saveToState: this.saveToState,
            focusInput: this.focusInput, 
            blurInput: this.blurInput,
            focus: this.state.focus,
        }
        return(
            <Mutation 
                mutation={SIGNUP_MUTATION} 
                variables={this.state}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
                {
                (signup, { called, loading, error, data }) => {
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
                        <div className="form-grid">
                            <MetaTitle>Sign up for an account</MetaTitle>
                            <form method="post" className="form form--signup" onSubmit={async e => {
                                e.preventDefault();
                                // more form validation here
                                // this.validateForm()
                                const res = await signup().catch(error => console.log(error.message));
                                this.setState({ email: '', password: '' });
                            }}>
                                <h2 className="form__title">Sign up for a new account</h2>
                                <fieldset disabled={loading} aria-busy={loading} className="form__fieldset">
                                    <LabelAndInput name="email" value={this.state.email} type="email" {...spread} />
                                    <LabelAndInput name="password" value={this.state.password} type="password" {...spread} />
                                    <button type="submit" className="form__submit">sign up</button>
                                </fieldset>
                                <div className="form__placeholder">
                                    {loading && <Loader containerClass="form-loader" />}
                                    {error && <NewError error={error} />}
                                </div>
                                <div className="form__links">
                                    <Link href="/login"><a className="form__link">Log into your account.</a></Link>
                                </div>
                            </form>
                        </div>
                    )
                }}
            </Mutation>
        )
    }
}

export default Signup;