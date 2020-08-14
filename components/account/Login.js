import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';

import User, { CURRENT_USER_QUERY } from './User';
import NewError from '../NewError';
import MetaTitle from '../snippets/MetaTitle';
import Loader from '../snippets/Loader';
import LabelAndInput from './LabelAndInput';

const LOGIN_MUTATION = gql`
    mutation LOGIN_MUTATION($email: String!, $password: String!){
        login(email: $email, password: $password){
            id
            email
        }
    }
`;

class Login extends React.Component{
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
            <User>
                {({ loading, error, data }) => {
                    if(loading) return <Loader containerClass="items-loader" />
                    if(error) return <NewError error={error} />
                    if(!data) return <p className="no-data">Uhm, something went wrong. Try again?</p>
                    if(data.me) return <p className="no-data">You are logged in.</p>

                    return(
                        <Mutation 
                            mutation={LOGIN_MUTATION} 
                            variables={this.state}
                            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                        >
                            {(login, {loading, error}) => (
                                <div className="form-grid">
                                    <MetaTitle>Log in</MetaTitle>
                                    <form method="post" className="form form--login" onSubmit={async e => {
                                        e.preventDefault();
                                        // more form validation here
                                        // this.validateForm()
                                        const res = await login().catch(error => console.log(error.message));
                                    }}>
                                        <h2 className="form__title">Log in</h2>
                                        <fieldset disabled={loading} aria-busy={loading} className="form__fieldset">
                                            <LabelAndInput name="email" value={this.state.email} type="email" {...spread} />
                                            <LabelAndInput name="password" value={this.state.password} type="password" {...spread} />
                                            <button type="submit" className="form__submit">log in</button>
                                        </fieldset>
                                        <div className="form__placeholder">
                                            {loading && <Loader containerClass="form-loader" />}
                                            {error && <NewError error={error} />}
                                        </div>
                                        <div className="form__links">
                                            <Link href="/requestreset"><a className="form__link">Forgot password?</a></Link>
                                            <Link href="/signup"><a className="form__link">New? Create an account.</a></Link>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </Mutation>
                    )
                }
                }
            </User>
        )
    }
}

export default Login;