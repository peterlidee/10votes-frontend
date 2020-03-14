import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './Error';

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!){
        requestReset(email: $email){
            message
        }
    }
`;

class RequestReset extends React.Component{
    state = {
        email: ""
    }
    saveToState = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render(){
        return(
            <Mutation 
                mutation={REQUEST_RESET_MUTATION} 
                variables={this.state}>
                {(reset, { loading, error, called }) => (
                    <form method="post" onSubmit={async e => {
                        e.preventDefault();
                        const res = await reset();
                        this.setState({ email: '' });
                    }}>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Request a password reset</h2>
                            <Error error={error} />
                            {!error && !loading && called && <p>Check your email for a reset link.</p>}
                            <label htmlFor="email">
                                email
                                <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.saveToState}/>
                            </label>
                            <button type="submit">request reset</button>
                        </fieldset>
                    </form>
                )}
            </Mutation>
        )
    }
}

export default RequestReset;