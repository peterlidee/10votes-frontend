import { useRouter } from 'next/router';
import SingleItem from '../components/SingleItem';

const Item = () => {
    // get the id from the url
    const router =  useRouter();
    const id = router.query.id;
    return <SingleItem id={id} />
}

export default Item;