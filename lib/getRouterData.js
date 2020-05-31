import { useRouter } from 'next/router';
import verifyOrderParam from '../lib/verifyOrderParam';
import gql from 'graphql-tag';

const TAGS_PAGINATION_QUERY = gql`
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

export default function getRouterData(addQueryParams = false){
    const router = useRouter();
    //console.log('router from getRouterData', router)
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
            routerData.variables = { slug: router.query.tagslug };
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