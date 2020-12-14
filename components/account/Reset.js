import React, { Component } from 'react';
//import { Mutation } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
//import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import MetaTitle from '../snippets/MetaTitle';
import FormRow from '../formParts/FormRow';
import InputContainer from '../formParts/InputContainer';
import FormButton from '../formParts/FormButton';
import Error from '../snippets/Error';

const RESET_MUTATION = gql`
    mutation RESET_MUTATION($password: String!, $confirmPassword: String!, $resetToken: String!){
        resetPassword(password: $password, confirmPassword: $confirmPassword, resetToken: $resetToken){
            id
        }
    }
`;

class Reset extends React.Component{
    static propTypes = {
        resetToken: PropTypes.string.isRequired,
    }
    state = {
        password: "",
        confirmPassword: "",
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
            <Mutation 
                mutation={RESET_MUTATION} 
                variables={{
                    resetToken: this.props.resetToken,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword,
                }}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
                {(reset, { loading, error, called }) => {
                    if(!error && !loading && called) return <p className="no-data">Your password was reset. You are now logged in with your new password.</p>
                    return(
                        <>
                            <MetaTitle>Choose a new password</MetaTitle>
                            <h2 className="title">Choose a new password</h2>

                            <form method="post" className="form-part form-part--account" onSubmit={async e => {
                                e.preventDefault();
                                // more form validation here
                                // this.validateForm()
                                const res = await reset().catch(error => console.log(error.message));
                                this.setState({ password: '', confirmPassword: '' });
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
                                        field: this.state.password, 
                                        form: this.state.password,
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

                                <FormRow 
                                    number={2}
                                    label={{ 
                                        text: "Confirm this password", 
                                        required: true,
                                        html: true,
                                        for: "confirmPassword",
                                    }}
                                    valid={{ 
                                        field: this.state.password, 
                                        form: this.state.password && this.state.confirmPassword,
                                    }}
                                >
                                    <InputContainer 
                                        clearField={this.clearField} 
                                        name="confirmPassword" 
                                        isEmpty={!this.state.confirmPassword}
                                    >
                                        <input 
                                            type="password" 
                                            minLength="6" 
                                            className="form-part__input"
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            value={this.state.confirmPassword}
                                            onChange={this.saveToState} 
                                        />
                                    </InputContainer>
                                </FormRow>

                                {error && 
                                    <FormRow valid={{ error: true, form: this.state.confirmPassword && this.state.password }}>
                                        <Error error={error} plain={true} />
                                    </FormRow>
                                }

                                <FormRow 
                                    number={3}
                                    extraClass="last"
                                    valid={{ 
                                        field: this.state.confirmPassword && this.state.password, 
                                        form: this.state.confirmPassword && this.state.password,
                                    }}
                                >
                                    <FormButton loading={loading} formValid={!this.state.confirmPassword || !this.state.password}>
                                        change password
                                    </FormButton>
                                </FormRow>  
                            </form>
                        </>
                    )
                }}
            </Mutation>
        )
    }
}

export default Reset;