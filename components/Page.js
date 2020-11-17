// import Meta from './header/Meta';
// import Header from './header/Header';
// import Footer from './footer/Footer.js';

// import User from './account/User';
// import User2 from './account/User2';

class PageX extends React.Component{
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







import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_TAG_QUERY = gql`
    query GET_TAG_QUERY($name: String!){
        tag(where: {name: $name}){
            id
            name
        }
    }
`;



const Page = props => (
    <div>
        <Query query={GET_TAG_QUERY} variables={{ name: "test" }}>
            {({loading, error, data}) => {
                if(loading) return <p>loading</p>
                if(error) return <p>{error.message}</p>
                if(!data){
                    console.log('no data found', data)
                }
                console.log('there was data', data)
                return <p>Hello</p>
            }}
        </Query>
    </div>
);







export default Page;