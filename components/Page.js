import Meta from './header/Meta';
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







import { gql, useQuery } from '@apollo/client';

const GET_TAG_QUERY2 = gql`
    query GET_TAG_QUERY($name: String!){
        tag(where: {name: $name}){
            id
            name
        }
    }
`;

const GET_TAG_QUERY = gql`
    query GET_TAG_QUERY($name: String!){
        tag(name: $name){
            id
            name
        }
    }
`;



const Page2 = props => {
    console.log('hello, I am page');
    return(

        <div>
        <Meta />
        <Query query={GET_TAG_QUERY} variables={{ name: "test" }}>
            {({loading, error, data}) => {
                if(loading) return <p>loading</p>
                if(error) return <p>{error.message}</p>
                if(!data || !data.tag){
                    console.log('no data found', data)
                }
                console.log('there was data', data)
                return <p>Hello</p>
            }}
        </Query>
        hello
    </div>
    )
};

function Page(props) {
    // const { loading, error, data } = useQuery(GET_TAG_QUERY, { variables: { name: "test" } });
    // console.log('hello, I am page', loading, error, data)
    // console.log('these are the props', props)
  
    // if (loading) return 'Loading...';
    // if (error) return `Error! ${error.message}`;
  
    return (
        <div>
            <p>PAGE HEADER</p>
            {props.children}
        </div>
    );
}

export default Page;