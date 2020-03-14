import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Error from './Error';
import { CURRENT_USER_QUERY } from './User';

const RESET_MUTATION = gql`
    mutation RESET_MUTATION($password: String!, $confirmPassword: String!, $resetToken: String!){
        resetPassword(password: $password, confirmPassword: $confirmPassword, resetToken: $resetToken){
            id
            email
            name
        }
    }
`;

class Reset extends React.Component{
    /*static propTypes = {
        resetToken: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        confirmPassword: PropTypes.string.isRequired
    }*/
    state = {
        password: "",
        confirmPassword: "",
    }
    saveToState = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render(){
        return(
            <Mutation 
                mutation={RESET_MUTATION} 
                variables={{
                    resetToken: this.props.resetToken,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword,
                }}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
                {(reset, { loading, error, called }) => (
                    <form method="post" onSubmit={async e => {
                        e.preventDefault();
                        const res = await reset();
                        this.setState({ password: '', confirmPassword: '' });
                    }}>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Reset your password</h2>
                            <Error error={error} />
                            <label htmlFor="password">
                                Password
                                <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.saveToState}/>
                            </label>
                            <label htmlFor="confirmPassword">
                                Confirm Password
                                <input type="password" name="confirmPassword" placeholder="confirmPassword" value={this.state.confirmPassword} onChange={this.saveToState}/>
                            </label>
                            <button type="submit">request reset</button>
                        </fieldset>
                    </form>
                )}
            </Mutation>
        )
    }
}

export default Reset;