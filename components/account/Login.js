import { useState, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';

import UserContext, { CURRENT_USER_QUERY } from '../context/UserContext';
import { USER_ITEMS_QUERY } from '../context/UserItemsContext';
import { USER_VOTES_QUERY } from '../context/UserVotesContext';

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
    // apollo mutation hooks
    // login mutation
    const [login, { error: loginError, loading: loginLoading }] = useMutation(LOGIN_MUTATION, {
        variables: { email, password },
        refetchQueries: [{ query: CURRENT_USER_QUERY }, { query: USER_VOTES_QUERY }, { query: USER_ITEMS_QUERY }],
    });
    // user context
    const { error: userError, data: userData, loading: userLoading } = useContext(UserContext);
    
    // handle user first
    if(userLoading) return <Loader containerClass="items-loader" />
    if(userError) return <Error error={userError} />
    if(!userData) return <p className="no-data">Uhm, something went wrong. Try again?</p>
    if(userData.me) return <p className="no-data">You are logged in.</p>

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

}

export default Login;