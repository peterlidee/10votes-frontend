import MyVotes from '../components/MyVotes';
import PleaseSignin from '../components/PleaseSignin';

const myVotesPage = props => (
    <div>
        <PleaseSignin>
            <MyVotes />
        </PleaseSignin>
    </div>
)

export default myVotesPage;