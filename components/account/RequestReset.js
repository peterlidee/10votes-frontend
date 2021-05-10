import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { REQUEST_RESET_MUTATION } from '../../queriesAndMutations/users/userMutations'

import MetaTitle from '../snippets/MetaTitle';
import FormRow from '../formParts/FormRow';
import InputContainer from '../formParts/InputContainer';
import FormButton from '../formParts/FormButton';
import Error from '../snippets/Error';
import NoData from '../snippets/NoData';

function RequestReset(){
    //react hooks
    const [email, setEmail] = useState('');
    // apollo mutation hook
    const [ requestReset, {error, loading, called} ] = useMutation(REQUEST_RESET_MUTATION, { variables: { email }});

    if(!error && !loading && called) return <NoData>We sent an email with reset instructions to {email}.</NoData>
    return(
        <>
            <MetaTitle>Request a password reset</MetaTitle>
            <h2 className="title">Request a password reset.</h2>

            <form method="post" className="form-part form-part--account" onSubmit={async e => {
                    e.preventDefault();
                    // more form validation here
                    // validateForm()?
                    const res = await requestReset().catch(error => console.log(error.message));
                    // reset to empty if pass was wrong
                    if(!res){
                        setEmail('');
                    }
                    // don't reset if success so we can use email in succes message
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
                            onChange={e => setEmail(e.target.value)}
                        />
                    </InputContainer>
                </FormRow>

                {error && 
                    <FormRow valid={{ error: true, form: email }}>
                        <Error error={error} plain={true} />
                    </FormRow>
                }

                <FormRow 
                    number={2}
                    extraClass="last"
                    valid={{ 
                        field: email, 
                        form: email,
                    }}
                >
                    <FormButton loading={loading} formValid={!email}>
                        request reset
                    </FormButton>
                </FormRow>

                <div className="form-part--account__links">
                    <p>This is configured with <a href="https://mailtrap.io/">mailtrap.io</a> as development environment. It works but won't actually send an email to you. So, don't try to reset your password yet. (it's on my todo list)</p>
                </div>

            </form>
        </>
    )
}

export default RequestReset;