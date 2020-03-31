import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import CreateLocation from './CreateLocation';
import ItemSelect from '../ItemSelect';
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
        selection: PropTypes.object.isRequired,
        handleLocationSelection: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        handleLoading: PropTypes.func.isRequired,
    }
    state = {
        locationName: '',
        locations: [],
    }
    // only one country, hardcoded for now
    country = {
        name: 'Belgium',
        id: 'ck8341a1e038d0a783red3hvv',
    }
    handleChange = (e) => {
        this.setState({
           [e.target.name]: e.target.value
        })
    }

    handleSearch = debounce(async (e, client) => {
        console.log('handling search', e);
        this.props.handleLoading(true);
        if(e.target.value.trim().length >= 3){
            const res = await client.query({
                query: GET_LOCATIONS_QUERY,
                variables: { searchTerm: e.target.value.trim() },
                fetchPolicy: "network-only"
            });
            this.setState({
                locations: res.data.locations,
            });
        }else{
            this.setState({
                locations: [],
            })
        }
        this.props.handleLoading(false);
    }, 350);


    handleSelect = (location) => {
        this.props.handleLocationSelection(location);
        this.setState({
            //selection: location,
            locationName: '',
            locations: [],
        })
    }
    render(){
        // find out if the location already exists, if so we don't allow create new location
        const locationExists = (this.state.locations.findIndex(
            location => location.name.toLowerCase() === this.state.locationName.trim().toLowerCase()
        ) >= 0) ? true : false;

        return(
            <div>

                {this.props.selection.name &&
                    <div>
                        location: 
                        {this.props.selection.name} - {this.props.selection.country.name} 
                        <button type="button" onClick={() => this.handleSelect({})}>&times;</button>
                    </div>
                }

                {!this.props.selection.name &&
                    <>
                        <ApolloConsumer>
                            {(client) => {
                                //console.log('client', client);
                                return(
                                    <>
                                        <label htmlFor="locationName">
                                            Add a place or city 
                                        </label>
                                        <input 
                                            type="text" 
                                            value={this.state.locationName} 
                                            id="locationName" 
                                            name="locationName" 
                                            onChange={(e) => {
                                                e.preventDefault();
                                                e.persist();
                                                this.handleChange(e);
                                                this.handleSearch(e, client);
                                            }}/>
                                    </>
                                )
                            }}
                        </ApolloConsumer>

                        <div>
                            { // if the Query returned results, display them here
                            this.state.locations.map(location => (
                                <ItemSelect 
                                    key={location.id}
                                    name={location.name} 
                                    id={location.id} 
                                    handleSelect={e => this.handleSelect(location)} 
                                    checked={false} />
                            ))}
        
                            { // the searchterm is too short or the query didn't return results
                            this.state.locations.length == 0 && this.state.locationName.trim().length >= 3 &&
                                <div>No suggestions found for {this.state.locationName.trim()} - {this.country.name}</div>
                            }
                        </div>
        
                        { // if the searchterm is long enough and is not present in the query results
                        this.state.locationName.trim().length >= 3 && !locationExists &&
                            <CreateLocation 
                                locationName={this.state.locationName.trim()} 
                                country={this.country}
                                handleCreate={this.handleSelect} 
                                loading={this.props.loading} />
                        }
                    </>
                }
            </div>
        )
    }
}

export default ManageLocation;