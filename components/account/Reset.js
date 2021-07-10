import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { USER_LOGGED_IN_QUERY } from '../../queriesAndMutations/users/userQueries'
import { USER_ITEMS_QUERY } from '../../queriesAndMutations/items/itemQueries'
import { USER_VOTES_QUERY } from '../../queriesAndMutations/votes/voteQueries'
import { RESET_MUTATION } from '../../queriesAndMutations/users/userMutations'

import MetaTitle from '../snippets/MetaTitle';
import FormRow from '../formParts/FormRow';
import InputContainer from '../formParts/InputContainer';
import FormButton from '../formParts/FormButton';
import Error from '../snippets/Error';
import NoData from '../snippets/NoData';

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