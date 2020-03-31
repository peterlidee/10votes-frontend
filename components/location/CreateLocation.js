import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import Error from '../Error';

const CREATE_LOCATION_MUTATION = gql`
    mutation CREATE_LOCATION_MUTATION($name: String!, $country: ID!){
        createLocation(name: $name, country: $country){
            id
            name
            country{
                id
                name
            }
        }
    }
`;

const CreateLocation = (props) => {
    return(
        <Mutation 
            mutation={CREATE_LOCATION_MUTATION} 
            variables={{ name: props.locationName, country: props.country.id }}>
                {( createLocation, { data, error, loading }) => {
                    return(
                        <>
                            <Error error={error} />
                            <button 
                                type="button"
                                onClick={ async e => {
                                    e.preventDefault();
                                    const res = await createLocation();
                                    //console.log(`I'm gonna create ${props.locationName}`);
                                    //console.log('response', res);
                                    props.handleCreate(res.data.createLocation);
                                }}
                                disabled={loading || props.loading}>
                                    add new location: {props.locationName} - {props.country.name} 
                            </button>
                        </>
                    )
                }}
        </Mutation>
    );
};

CreateLocation.propTypes = {
    locationName: PropTypes.string.isRequired,
    handleCreate: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
}

export default CreateLocation;