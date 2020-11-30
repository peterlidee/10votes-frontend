import Meta from './header/Meta';
import Header from './header/Header';
//import Footer from './footer/Footer.js';



function Page(props) {  
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

export default Page;