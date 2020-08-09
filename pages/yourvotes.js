import YourVotes from '../components/voting/YourVotes';
import PleaseSignin from '../components/account/PleaseSignin';

const yourVotesPage = props => (
    <PleaseSignin>
        <YourVotes />
    </PleaseSignin>
)

export default yourVotesPage;