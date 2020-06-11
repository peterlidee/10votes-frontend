import Reset from '../components/account/Reset';

const ResetPage = props => (
    <div>
        <Reset resetToken={props.query.resetToken}/>
    </div>
);

export default ResetPage;