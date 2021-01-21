import {useState} from 'react';
import { gql, useMutation } from '@apollo/client';
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

/*
const TEST_MUTATION = gql`
    mutation TEST_MUTATION{
        testCookie{
            message
        }
    }
`;

function Signup(){
    // apollo mutation hook
    const [testCookie, { error, data, loading, called }] = useMutation(TEST_MUTATION);
    console.log('data', data)
    if(error) return 'error'
    if(loading) return 'loading'
    return(
        <button onClick={async e => {
            e.preventDefault();
            // more form validation here
            const res = await testCookie().catch(error => console.log(error.message));
            console.log('res', res)
        }}>boo{loading ? '...' : '!' }</button>
    )
}
*/

function Signup(){
    // react state hooks
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    // apollo mutation hook
    const [signup, { error, data, loading, called }] = useMutation(SIGNUP_MUTATION, {
        variables: { email, password },
        refetchQueries: [{ query: CURRENT_USER_QUERY }], // TODO? not needed?
    });

    if(called && !error && !loading && data && data.signup){
        return <p className="no-data">You are logged into your new account: {data.signup.email}.</p>
    }

    if(error){ // overwrite the bad UX graphQl error
        if (error.message == "A unique constraint would be violated on User. Details: Field name = email"){
            const calledEmail = email ? `The email: ${email}` : "This email";
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
                const res = await signup().catch(error => console.log(error.message));
                // reset the form fields to empty
                setEmail('');
                setPassword('');
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
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </InputContainer>
                </FormRow>

                {error && 
                    <FormRow valid={{ error: true, form: email && password }}>
                        <Error error={error} plain={true} />
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
                    <FormButton loading={loading} formValid={!email || !password}>
                        sign up
                    </FormButton>
                </FormRow>  
                
                <div className="form-part--account__links">
                    <Link href="/login"><a className="form__link">Do you already have an account? Log in.</a></Link>
                </div>

            </form>
        </>
    )
}

export default Signup;