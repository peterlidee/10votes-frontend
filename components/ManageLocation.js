import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import ItemSelect from './ItemSelect';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

const GET_LOCATIONS_QUERY = gql`
    query GET_LOCATIONS_QUERY($searchTerm: String!){
        locations(where: { name_contains: $searchTerm }){
            id
            name
            country{
                id
                name
            }
        }
    }
`;

class ManageLocation extends React.Component{
    static propTypes = {
        locationName: PropTypes.string.isRequired,
        locationId: PropTypes.string.isRequired,
        handleLocationSelection: PropTypes.func.isRequired,
        handleLocationChange: PropTypes.func.isRequired,
    }
    state = {
        locationQuery: [],
    }
    // only one country, hardcoded for now
    country = {
        name: 'Belgium',
        id: 'ck8341a1e038d0a783red3hvv',
    }

    handleSearch = debounce(async (e, client) => {
        if(e.target.value.trim().length >= 3){
            const res = await client.query({
                query: GET_LOCATIONS_QUERY,
                variables: { searchTerm: e.target.value.trim() },
                fetchPolicy: "network-only"
            });
            this.setState({
                locationQuery: res.data.locations,
            });
        }else{
            this.setState({
                locationQuery: [],
            })
        }
    }, 350);


    handleSelect = (location) => {
        this.props.handleLocationSelection(location);
        this.setState({
            locationQuery: [],
        })
    }

    render(){

        return(
            <div>

                { // if there's a locationId, it means an existing location was selected
                this.props.locationId &&
                    <div>
                        location: 
                        {this.props.locationName} - {this.country.name} 
                        <button type="button" onClick={() => this.handleSelect({ name: "", id: "" })}>&times;</button>
                    </div>
                }

                { // no locationId means there's a new location or no location
                !this.props.locationId &&
                    <>
                        <ApolloConsumer>
                            {(client) => (
                                <>
                                    <label htmlFor="locationName">
                                        Add a place or city 
                                    </label>
                                    <input 
                                        type="text" 
                                        value={this.props.locationName} 
                                        id="locationName" 
                                        name="locationName" 
                                        onChange={(e) => {
                                            e.persist();
                                            this.props.handleLocationChange(e);
                                            this.handleSearch(e, client);
                                        }}/>
                                    <input type="text" readOnly value={this.country.name} />
                                </>
                            )}
                        </ApolloConsumer>

                        <div>
                            { // if the Query returned results, display them here
                            this.state.locationQuery.map(location => (
                                <ItemSelect 
                                    key={location.id}
                                    name={location.name} 
                                    id={location.id} 
                                    handleSelect={e => this.handleSelect(location)} 
                                    checked={false} />
                            ))}
                        </div>
                    </>
                }
            </div>
        )
    }
}

export default ManageLocation;