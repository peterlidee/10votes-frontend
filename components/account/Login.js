//import { Mutation } from 'react-apollo';
//import gql from 'graphql-tag';
import Link from 'next/link';

import User, { CURRENT_USER_QUERY } from './User';
import Error from '../snippets/Error';
import MetaTitle from '../snippets/MetaTitle';
import Loader from '../snippets/Loader';
import FormRow from '../formParts/FormRow';
import InputContainer from '../formParts/InputContainer';
import FormButton from '../formParts/FormButton';

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
            <User>
                {({ loading, error, data }) => {
                    if(loading) return <Loader containerClass="items-loader" />
                    if(error) return <Error error={error} />
                    if(!data) return <p className="no-data">Uhm, something went wrong. Try again?</p>
                    if(data.me) return <p className="no-data">You are logged in.</p>

                    return(
                        <Mutation 
                            mutation={LOGIN_MUTATION} 
                            variables={this.state}
                            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                        >
                            {(login, {loading, error}) => (
                                <>
                                    <MetaTitle>Log in</MetaTitle>
                                    <h2 className="title">Log in</h2>

                                    <form method="post" className="form-part form-part--account" onSubmit={async e => {
                                        e.preventDefault();
                                        // more form validation here
                                        // this.validateForm()
                                        const res = await login().catch(error => console.log(error.message));
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
                                                log in
                                            </FormButton>
                                        </FormRow>  
                                        
                                        <div className="form-part--account__links">
                                            <Link href="/requestreset"><a className="form__link">Forgot password?</a></Link>
                                            <Link href="/signup"><a className="form__link">New? Create an account.</a></Link>
                                        </div>

                                    </form>
                                </>
                            )}
                        </Mutation>
                    )
                }}
            </User>
        )
    }
}

export default Login;