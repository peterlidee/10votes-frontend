import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from '../Error';
import { CURRENT_USER_QUERY } from './User';
import Title from '../Title';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!){
        signup(email: $email, name: $name, password: $password){
            id
            email
            name
        }
    }
`;

class Signup extends React.Component{
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
                mutation={SIGNUP_MUTATION} 
                variables={this.state}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
                {(signup, {loading, error}) => (
                    <form method="post" onSubmit={async e => {
                        e.preventDefault();
                        const res = await signup();
                        this.setState({name: '', email: '', password: ''});
                    }}>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <Title>Sign up for an account</Title>
                            <h2>Sign up for an account</h2>
                            <Error error={error} />
                            <label htmlFor="email">
                                email
                                <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.saveToState}/>
                            </label>
                            <label htmlFor="name">
                                name
                                <input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.saveToState}/>
                            </label>
                            <label htmlFor="password">
                                password
                                <input type="password" name="password"  placeholder="password" value={this.state.password} onChange={this.saveToState}/>
                            </label>
                            <button type="submit">signup</button>
                        </fieldset>
                    </form>
                )}
            </Mutation>
        )
    }
}

export default Signup;