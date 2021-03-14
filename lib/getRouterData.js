import { useRouter } from 'next/router';
import verifyOrderParam from '../lib/verifyOrderParam';
import { gql } from '@apollo/client';

const TAGS_PAGINATION_QUERY2 = gql`
    query TAGS_PAGINATION_QUERY($slug: String!){
        itemsConnection(
            where: { tags_some: { slug: $slug }}
        ){
            aggregate{
                count
            }
        }
    }
`;

const TAGS_PAGINATION_QUERY = gql`
    query TAGS_PAGINATION_QUERY($tagSlug: String!){
        itemsConnection( tagSlug: $tagSlug ){
            aggregate{
                count
            }
        }
    }
`;

const PLACE_PAGINATION_QUERY = gql`
    query PLACE_PAGINATION_QUERY($countryCode: String!, $slug: String!){
        itemsConnection(
            where: { AND: [
                { location: { slug: $slug }},
                { location: { country: { countryCode: $countryCode }}},
            ]}
        ){
            aggregate{
                count
            }
        }
    }
`;

const COUNTRY_PAGINATION_QUERY = gql`
    query COUNTRY_PAGINATION_QUERY($countryCode: String!){
        itemsConnection(
            where: { location: { country: { countryCode: $countryCode }}},
        ){
            aggregate{
                count
            }
        }
    }
`;

// this is used in different locations: itemsCount, Pagination, OrderItems, FancyTitle
// we need similar but different things in these components
// the gql query to get the itemsCount for the correct type: tag, location or country
// the corresponding query parameters for these queries: tagSlug / placeSlug / countryCode, we get these from url parameters
// data from url query: orderBy, page
// the hrefPath and asPath to construct urls

// only pass 


// we need a count of items in Pagination and in ItemsCount

export default function getRouterData(addQueryParams = false){
    const router = useRouter();
    console.log('router from getRouterData', router)
    // get the data for constructing url
    const routerData = {
        hrefPath: router.pathname,
        asPath: router.asPath.split('?')[0],
        orderBy: verifyOrderParam(router.query.orderBy),
        page: +router.query.page || 1,
    };

    // get the params for making a Query based on the route: Query.query Query.variables
    // we only pass these when asked (addQueryParams)
    if(addQueryParams){
        if(router.query.tagslug){
            routerData.variables = { tagSlug: router.query.tagslug };
            routerData.query = TAGS_PAGINATION_QUERY;
        }else if(router.query.place){
            routerData.variables = { slug: router.query.place, countryCode: router.query.countryCode };
            routerData.query = PLACE_PAGINATION_QUERY;
        }else if(router.query.countryCode){
            routerData.variables = { countryCode: router.query.countryCode };
            routerData.query = COUNTRY_PAGINATION_QUERY;
        }
    }

    return routerData;
}