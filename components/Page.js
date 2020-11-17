import Meta from './header/Meta';
import Header from './header/Header';
import Footer from './footer/Footer.js';

import User from './account/User';
import User2 from './account/User2'

class Page extends React.Component{
    render(){
        return(
            <>
                {/*<Meta />*/}
                {/*<Header />*/}
                <main className="site__main">
                    {/* test */}
                    
                    {/*<User2 />*/}
                    hello

                    {/* test */}
                    {/*this.props.children*/}
                </main>
                {/*<Footer />*/}
            </>
        )
    }
}

export default Page;