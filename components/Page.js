import Meta from './header/Meta';
import Header from './header/Header';
import Footer from './footer/Footer.js';

class Page extends React.Component{
    render(){
        return(
            <>
                {/*<Meta />*/}
                <Header />
                <main className="site__main">
                    {/*this.props.children*/}
                    hello
                </main>
                {/*<Footer className="site__footer" />*/}
            </>
        )
    }
}

export default Page;