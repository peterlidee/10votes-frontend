import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import NewError from '../NewError';
import MetaTitle from '../snippets/MetaTitle';
import Loader from '../snippets/Loader';
import LabelAndInput from './LabelAndInput';

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
        focus: "",
    }
    saveToState = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    focusInput = (e) => {
        this.setState({ 
            focus: e.target.name 
        })
    }
    blurInput = () => {
        this.setState({ 
            focus: "" 
        })
    }
    render(){
        // we spread these into the LabelAndInput component so we don't have to type it everty time
        const spread = { 
            saveToState: this.saveToState,
            focusInput: this.focusInput, 
            blurInput: this.blurInput,
            focus: this.state.focus,
        }
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
                        <div className="form-grid">
                            <MetaTitle>Reset your password</MetaTitle>
                            <form method="post" className="form form--reset" onSubmit={async e => {
                                e.preventDefault();
                                // more form validation here
                                // this.validateForm()
                                const res = await reset().catch(error => console.log(error.message));
                                this.setState({ password: '', confirmPassword: '' });
                            }}>
                                <h2 className="form__title">Reset your password</h2>
                                <fieldset disabled={loading} aria-busy={loading} className="form__fieldset">
                                    <LabelAndInput name="password" value={this.state.password} type="password" {...spread} label="Enter a new password" />
                                    <LabelAndInput name="confirmPassword" value={this.state.confirmPassword} type="password" {...spread} label="Confirm this password" />
                                    <button type="submit" className="form__submit">change password</button>
                                </fieldset>
                                <div className="form__placeholder">
                                    {loading && <Loader containerClass="form-loader" />}
                                    {error && <NewError error={error} />}
                                </div>
                            </form>
                        </div>
                    )
                }}
            </Mutation>
        )
    }
}

export default Reset;