// this component is used to display all items for a single tag, location or country
// it checks if the given slug for the given taxonomy exists and handles errors and loading
// it then calls a new component that gets all the items for this taxonomy[slug]

import { TAG_EXISTS_QUERY, COUNTRY_EXISTS_QUERY, LOCATION_EXISTS_QUERY } from './SingleTaxonomyQueries';
import { useQuery } from '@apollo/client';

import Loader from '../snippets/Loader';
import Error from '../snippets/Error';

function NoTaxonomyMessage(props){
    return <p className="no-data">Hmmm, we don't have a {props.type} '<em>{props.children}</em>' in our database. Try another {props.type} :/</p>
}

// props: type! (tag, location, country), tagSlug, 
function SingleTaxonomyExists(props){
    // select query and contruct variables for each type
    let query;
    const variables = {};
    if(props.type == 'tag'){
        query = TAG_EXISTS_QUERY;
        variables.tagSlug = props.tagSlug;
    }
    if(props.type == 'location'){
        query = LOCATION_EXISTS_QUERY;
        variables.locationSlug = props.locationSlug;
        variables.countryCode = props.countryCode;
    }
    if(props.type == 'country'){
        query = COUNTRY_EXISTS_QUERY;
        variables.countryCode = props.countryCode;
    }
    const { loading, error, data } = useQuery(query, { variables });

    if(loading) return <Loader containerClass="items-loader" />;                
    if(error) return <Error error={error} />
    // check for tags, location and country if the slug returned data
    if(props.type == 'tag' && (!data || !data.tag)) 
        return <NoTaxonomyMessage type={props.type}>{props.tagSlug}</NoTaxonomyMessage>;
    if(props.type == 'location' && (!data || !data.locations[0])) 
        return <NoTaxonomyMessage type={props.type}>{props.locationSlug} - {props.countryCode}</NoTaxonomyMessage>;
    if(props.type == 'country' && (!data || !data.country)) 
        return <NoTaxonomyMessage type={props.type}>{props.countryCode}</NoTaxonomyMessage>;
    // fall through option
    if(!data) return <p className="no-data">No data found</p>

    // at this point, we have data for this slug, so start loading components
    console.log('data',data)
    return 'data found, yay'
}

export default SingleTaxonomyExists;