import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './Error';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!){
        signin(email: $email, password: $password){
            id
            email
            name
        }
    }
`;

class Signin extends React.Component{
    state = {
        name: "",
        password: "",
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
                mutation={SIGNIN_MUTATION} 
                variables={this.state}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
                {(signup, {loading, error}) => (
                    <form method="post" onSubmit={async e => {
                        e.preventDefault();
                        const res = await signup();
                        this.setState({name: '', email: '', password: ''});
                    }}>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Sign into your account</h2>
                            <Error error={error} />
                            <label htmlFor="email">
                                email
                                <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.saveToState}/>
                            </label>
                            <label htmlFor="password">
                                password
                                <input type="password" name="password"  placeholder="password" value={this.state.password} onChange={this.saveToState}/>
                            </label>
                            <button type="submit">signin</button>
                        </fieldset>
                    </form>
                )}
            </Mutation>
        )
    }
}

export default Signin;