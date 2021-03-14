//import SingleCountry from "../../../components/SingleCountry";

import SingleTaxonomyExists from '../../../components/items/SingleTaxonomyExists';
import verifyOrderParam from '../../../lib/verifyOrderParam'

const CountryPage = props => (
    <SingleTaxonomyExists type="country" {...props} />
)

// this function only runs on the server by Next.js
export const getServerSideProps = async ({params, query}) => {
    console.log('parans',params)
    console.log('query',query)
    const countryCode = params.countryCode;
    const orderBy = verifyOrderParam(query.orderBy);
    const page = query.page || 1;
    // return {
    //     props: { tagSlug, orderBy, page }
    // }
    return {
        props: { countryCode, orderBy, page }
    }
}

export default CountryPage;




const Tagpage2 = props => (
    <SingleTag {...props} />
)

const Tagpage = props => (
    <SingleTaxonomyExists type="tag" {...props} />
)

// this function only runs on the server by Next.js
// export const getServerSideProps = async ({params, query}) => {
//     const tagSlug = params.tagslug;
//     const orderBy = verifyOrderParam(query.orderBy);
//     const page = query.page || 1;
//     return {
//         props: { tagSlug, orderBy, page }
//     }
// }

//export default Tagpage;