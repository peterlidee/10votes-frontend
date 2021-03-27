import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { USER_LOGGED_IN_QUERY } from '../context/UserContext';
import { USER_ITEMS_QUERY } from '../context/UserItemsContext';
import { USER_VOTES_QUERY } from '../context/UserVotesContext';

import MetaTitle from '../snippets/MetaTitle';
import FormRow from '../formParts/FormRow';
import InputContainer from '../formParts/InputContainer';
import FormButton from '../formParts/FormButton';
import Error from '../snippets/Error';
import NoData from '../snippets/NoData';


const RESET_MUTATION = gql`
    mutation RESET_MUTATION($password: String!, $confirmPassword: String!, $resetToken: String!){
        resetPassword(password: $password, confirmPassword: $confirmPassword, resetToken: $resetToken){
            id
        }
    }
`;

function Reset(){
    // get the url query
    const router =  useRouter();
    const resetToken = router.query.resetToken || '';
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [ reset, {data, loading, error, called} ] = useMutation(RESET_MUTATION, {
        variables: {
            password,
            confirmPassword,
            resetToken,
        },
        refetchQueries: [{ query: USER_LOGGED_IN_QUERY }, { query: USER_VOTES_QUERY }, { query: USER_ITEMS_QUERY }]
    })
    if(!error && !loading && called) return <NoData>Your password was reset. You are now logged in with your new password.</NoData>
    return(
        <>
            <MetaTitle>Choose a new password</MetaTitle>
            <h2 className="title">Choose a new password</h2>

            <form method="post" className="form-part form-part--account" onSubmit={async e => {
                e.preventDefault();
                // more form validation here
                const res = await reset().catch(error => console.log(error.message));
                setPassword('');
                setConfirmPassword('');
            }}>

                <FormRow 
                    number={1}
                    label={{ 
                        text: "Enter a new password", 
                        required: true,
                        html: true,
                        for: "password",
                    }}
                    valid={{ 
                        field: password, 
                        form: password,
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

                <FormRow 
                    number={2}
                    label={{ 
                        text: "Confirm this password", 
                        required: true,
                        html: true,
                        for: "confirmPassword",
                    }}
                    valid={{ 
                        field: password, // TODO confirmPassword?
                        form: password && confirmPassword,
                    }}
                >
                    <InputContainer 
                        clearField={() => setConfirmPassword('')} 
                        name="confirmPassword" 
                        isEmpty={!confirmPassword}
                    >
                        <input 
                            type="password" 
                            minLength="6" 
                            className="form-part__input"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)} 
                        />
                    </InputContainer>
                </FormRow>

                {error && 
                    <FormRow valid={{ error: true, form: confirmPassword && password }}>
                        <Error error={error} plain={true} />
                    </FormRow>
                }

                <FormRow 
                    number={3}
                    extraClass="last"
                    valid={{ 
                        field: confirmPassword && password, 
                        form: confirmPassword && password,
                    }}
                >
                    <FormButton loading={loading} formValid={!confirmPassword || !password}>
                        change password
                    </FormButton>
                </FormRow>  
            </form>
        </>
    )
}

export default Reset;