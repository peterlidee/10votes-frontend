import Meta from './header/Meta';
import Header from './header/Header';
import Footer from './footer/Footer.js';

import User from './account/User';

class Page extends React.Component{
    render(){
        return(
            <>
                {/*<Meta />*/}
                {/*<Header />*/}
                <main className="site__main">
                    {/* test */}
                    <User>
                        {({ loading, error, data }) => {
                            if(error) return <p>Error</p>
                            if(loading) return <p>loading</p>
                            if(!data) return <p>no data</p>
                            console.log('data', data)
                            return <p>Hello from inside user data.</p>
                        }}
                    </User>
                    {/* test */}
                    {/*this.props.children*/}
                </main>
                {/*<Footer />*/}
            </>
        )
    }
}

export default Page;