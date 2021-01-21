import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
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

function Login(){
    // react hooks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // apollo mutation hook
    const [login, { error: loginError, loading: loginLoading }] = useMutation(LOGIN_MUTATION, {
        variables: { email, password },
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    return(
        <User>
            {({ loading, error, data }) => {
                if(loading) return <Loader containerClass="items-loader" />
                if(error) return <Error error={error} />
                if(!data) return <p className="no-data">Uhm, something went wrong. Try again?</p>
                if(data.me) return <p className="no-data">You are logged in.</p>

                return(
                    <>
                        <MetaTitle>Log in</MetaTitle>
                        <h2 className="title">Log in</h2>

                        <form method="post" className="form-part form-part--account" onSubmit={async e => {
                            e.preventDefault();
                            // more form validation here
                            // this.validateForm()
                            const res = await login().catch(loginError => console.log(loginError.message));
                            if(res && res.data){ // after succesfull login, remove email and pass from state
                                setEmail('');
                                setPassword('');
                            }
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
                                    field: email, 
                                    form: email,
                                }}
                            >
                                <InputContainer 
                                    clearField={() => setEmail('')} 
                                    name="email" 
                                    isEmpty={!email}
                                >
                                    <input 
                                        type="email" 
                                        className="form-part__input"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange= {(e) => setEmail(e.target.value)}
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
                                    field: password, 
                                    form: email && password,
                                }}
                            >
                                <InputContainer 
                                    clearField={() => setPassword('')} 
                                    name="password" 
                                    isEmpty={!password}
                                >
                                    <input 
                                        type="password" 
                                        minLength="6" 
                                        className="form-part__input"
                                        name="password"
                                        id="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)} 
                                    />
                                </InputContainer>
                            </FormRow>

                            {loginError && 
                                <FormRow valid={{ error: true, form: email && password }}>
                                    <Error error={loginError} plain={true} />
                                </FormRow>
                            }

                            <FormRow 
                                number={3}
                                extraClass="last"
                                valid={{ 
                                    field: email && password, 
                                    form: email && password,
                                }}
                            >
                                <FormButton loading={loginLoading} formValid={!email || !password}>
                                    log in
                                </FormButton>
                            </FormRow>  
                            
                            <div className="form-part--account__links">
                                <Link href="/requestreset"><a className="form__link">Forgot password?</a></Link>
                                <Link href="/signup"><a className="form__link">New? Create an account.</a></Link>
                            </div>

                        </form>
                    </>
                )
            }}
        </User>
    )
}

class Login2 extends React.Component{
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