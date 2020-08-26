import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import NewError from '../NewError';
import MetaTitle from '../snippets/MetaTitle';
import Loader from '../snippets/Loader';
import LabelAndInput from './LabelAndInput';

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!){
        requestReset(email: $email){
            message
        }
    }
`;

class RequestReset extends React.Component{
    state = {
        email: "",
        focus: ""
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
        this.setState({ focus: "" })
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
                mutation={REQUEST_RESET_MUTATION} 
                variables={this.state}>
                {(requestReset, { loading, error, called }) => {
                    if(!error && !loading && called) return <p className="no-data">We sent an email with reset instructions to {this.state.email}.</p>
                    return(
                        <div className="form-grid">
                            <MetaTitle>Request a password reset</MetaTitle>
                            <form method="post" className="form form--requestreset" onSubmit={async e => {
                                e.preventDefault();
                                // more form validation here
                                // this.validateForm()
                                const res = await requestReset().catch(error => console.log(error.message));
                                // reset to empty if pass was wrong
                                if(!res){
                                    this.setState({ email: '' });
                                }
                                // don't reset if succes so we can use email in succes message
                            }}>
                                <h2 className="form__title">Reset your password</h2>
                                <fieldset disabled={loading} aria-busy={loading} className="form__fieldset">
                                    <LabelAndInput name="email" value={this.state.email} type="email" {...spread} animateLabel={false} label="What email did you sign up with?" />
                                    <button type="submit" className="form__submit">request reset</button>
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

export default RequestReset;