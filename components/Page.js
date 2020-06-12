import Header from './header/Header';
import Meta from './header/Meta';

class Page extends React.Component{
    render(){
        return(
            <div>
                <Meta />
                <Header />
                {this.props.children}
            </div>
        )
    }
}
export default Page;