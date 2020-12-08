import Meta from './header/Meta';
import Header from './header/Header';
//import Footer from './footer/Footer.js';




function Page2(props) {  
    return (
        <>
            <Meta />
            <Header />
            <main className="site__main">
                {props.children}
            </main>
            {/*<Footer />*/}
        </>
    );
}

import { gql, useMutation } from '@apollo/client';

const TEST_MUTATION = gql`
    mutation TEST_MUTATION{
        testCookie{
            message
        }
    }
`;

function Page(){
    // apollo mutation hook
    const [testCookie, { error, data, loading }] = useMutation(TEST_MUTATION);
    if(error) return 'error'
    if(loading) return 'loading'
    console.log('data', data)
    return(
        <button onClick={e => {
            e.preventDefault();
            // more form validation here
            const res = testCookie().catch(error => console.log(error.message));
            //console.log('res', res)
        }}>set{loading ? 'ting' : '' } cookie</button>
    )
}

export default Page;