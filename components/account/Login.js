import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from '../Error';
import User, { CURRENT_USER_QUERY } from './User';
import MetaTitle from '../snippets/MetaTitle';
import Link from 'next/link';

const LOGIN_MUTATION = gql`
    mutation LOGIN_MUTATION($email: String!, $password: String!){
        login(email: $email, password: $password){
            id
            email
            name
        }
    }
`;

class Login extends React.Component{
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
            <User>
                {({ loading, error, data }) => {
                    if(loading) return <p>...loading</p>
                    if(error) return <Error error={error} />
                    if(!data) return <p>Something went wrong!</p>
                    const { me } = data;
                    return(
                        <>
                            <MetaTitle>Log in</MetaTitle>
                            {me && <p>You are logged in.</p>}
                            {!me && (
                                <Mutation 
                                    mutation={LOGIN_MUTATION} 
                                    variables={this.state}
                                    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                                >
                                    {(login, {loading, error}) => (
                                        <div>
                                            <form method="post" onSubmit={async e => {
                                                e.preventDefault();
                                                const res = await login();
                                                this.setState({name: '', email: '', password: ''});
                                            }}>
                                                <fieldset disabled={loading} aria-busy={loading}>
                                                    <h2>Log into your account</h2>
                                                    <Error error={error} />
                                                    <label htmlFor="email">
                                                        email
                                                        <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.saveToState}/>
                                                    </label>
                                                    <label htmlFor="password">
                                                        password
                                                        <input type="password" name="password"  placeholder="password" value={this.state.password} onChange={this.saveToState}/>
                                                    </label>
                                                    <button type="submit">log in</button>
                                                    <p>Euhm ... password? <Link href="/requestreset"><a>reset your password</a></Link></p>
                                                </fieldset>
                                                <p>New to 10votes? <Link href="/signup"><a>Create an account</a></Link>.</p>
                                            </form>
                                        </div>
                                    )}
                                </Mutation>
                            )}
                        </>
                    );
                }}
            </User>
        )
    }
}

export default Login;