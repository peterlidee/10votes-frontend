import Signup from '../components/Signup';
import Login from '../components/account/Login';
import RequestReset from '../components/RequestReset';

const signupPage = props => (
    <div>
        <Signup />
        <Login />
        <RequestReset />
    </div>
)

export default signupPage;