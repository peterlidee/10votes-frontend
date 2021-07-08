// this component is used to display all items for a single tag, location or country
// it checks if the given slug for the given taxonomy exists and handles errors and loading
// it then calls a series of new components for this taxonomy[slug]

import PropTypes from 'prop-types';

import getQueriesAndVariables from '../../lib/getQueriesAndVariables';
import { useQuery } from '@apollo/client';

import Error from '../snippets/Error';
import NoData from '../snippets/NoData';
import MetaTitle from '../snippets/MetaTitle';
import TaxonomyTitle from './TaxonomyTitle';
import SingleTaxonomyItems from './SingleTaxonomyItems';
import OrderItems from '../items/OrderItems';
import Pagination from '../items/Pagination';

function NoTaxonomyMessage(props){
    return <NoData>Hmmm, we don't have a {props.type} '<em>{props.children}</em>' in our database. Try another {props.type} :/</NoData>
}

// props: type! (tags, locations, country), tagSlug, locationSlug, countryCode, page!, skip!
function SingleTaxonomyExists(props){
    // get query and variables to feed to useQuery
    const { query, variables } = getQueriesAndVariables(props.type, "exists", 
        // if no f.e. props.tagSlug, it will have undefined as value
        { tagSlug: props.tagSlug, locationSlug: props.locationSlug, countryCode: props.countryCode }
    );
    const { loading, error, data } = useQuery(query, { 
        variables,
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-only",
    });

    // we don't return a loading state for this component cause it would get too 'loady'               
    if(loading) return null;
    if(error) return <Error error={error} />

    // check for tags, location and country if the slug returned data
    if(props.type == 'tags' && (!data || !data.tag)) 
        return <NoTaxonomyMessage type={props.type.slice(0,-1)}>{props.tagSlug}</NoTaxonomyMessage>;
    if(props.type == 'locations' && (!data || !data.locations[0])) 
        return <NoTaxonomyMessage type={props.type.slice(0,-1)}>{props.locationSlug} - {props.countryCode}</NoTaxonomyMessage>;
    if(props.type == 'country' && (!data || !data.country)) 
        return <NoTaxonomyMessage type={props.type}>{props.countryCode}</NoTaxonomyMessage>;
    // fall through option
    if(!data) return <NoData>No data found</NoData>

    // at this point, we have a valid slug for the taxonomy, so start loading components
    // construct props for child components
    const propsToPass = { 
        type: props.type,
        page: props.page,
        orderBy: props.orderBy,
        data: data,
    }
    return( 
        <section>
            {props.type == "tags"      && <MetaTitle>{`Pics with tag #${data.tag.name}`}</MetaTitle>}
            {props.type == "locations" && <MetaTitle>{`Pics in ${data.locations[0].name} - ${data.locations[0].country.name}`}</MetaTitle>}
            {props.type == "country"   && <MetaTitle>{`Pics in ${data.country.name}`}</MetaTitle>}
            
            <TaxonomyTitle {...propsToPass} />
            <OrderItems {...propsToPass} />
            <SingleTaxonomyItems {...propsToPass} />
            <Pagination {...propsToPass} />
        </section>
    )
}

SingleTaxonomyExists.propTypes = {
    type: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default SingleTaxonomyExists;