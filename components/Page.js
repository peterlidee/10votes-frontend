import Header from './header/Header';
import Meta from './header/Meta';

class Page extends React.Component{
    render(){
        return(
            <>
                <Meta />
                <Header />
                <main className="site__main">
                    {this.props.children}
                </main>
            </>
        )
    }
}
export default Page;