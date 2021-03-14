import SingleTag from '../../components/SingleTag'
import verifyOrderParam from '../../lib/verifyOrderParam'

const Tagpage = props => (
    <SingleTag {...props} />
)

// this function only runs on the server by Next.js
export const getServerSideProps = async ({params, query}) => {
    const tagSlug = params.tagslug;
    const orderBy = verifyOrderParam(query.orderBy);
    const page = query.page || 1;
    return {
        props: { tagSlug, orderBy, page }
    }
}

export default Tagpage;
 