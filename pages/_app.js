/*
import App from 'next/app';
import { ApolloProvider } from '@apollo/client';

import withApollo from "../lib/withData";
import MenuContextComponent from '../components/header/MenuContext';
import Page from '../components/Page';

//import '../sass/index.scss';

class MyApp extends App{

    // get the url query
    // static async getInitialProps({Component, ctx}){
    //     let pageProps = {};
    //     if(Component.getInitialProps){
    //         pageProps = await Component.getInitialProps(ctx);
    //     }
    //     // this exposes the query to the user
    //     pageProps.query = ctx.query;
    //     return { pageProps };
    // }

    render(){
        //const { Component, pageProps, apolloClient } = this.props;
        const { Component, apolloClient } = this.props;

        return(
            <ApolloProvider client={apolloClient}>
                {/*<MenuContextComponent>
                    <Page>
                        <Component {...pageProps} />
                    </Page>
                </MenuContextComponent>/}
                <Page />
            </ApolloProvider>
        )
    }
}

//export default withApollo({ ssr: true })(MyApp);
export default withApollo()(MyApp);

*/

// remove next-with-apollo TODO ?

// expose query to user
// use menuContext

import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo'
import { MenuContextProvider } from '../components/context/MenuContext';
import { UserContextProvider } from '../components/context/UserContext';
import { UserItemsContextProvider } from '../components/context/UserItemsContext';
import Page from '../components/Page';

import '../sass/index.scss';

export default function App({ Component, pageProps }) {
    const apolloClient = useApollo(pageProps)
    return (
        <ApolloProvider client={apolloClient}>
            <UserContextProvider>
                <UserItemsContextProvider>
                    <MenuContextProvider>
                        <Page>
                            <Component {...pageProps} />
                        </Page>
                    </MenuContextProvider>
                </UserItemsContextProvider>
            </UserContextProvider>
        </ApolloProvider>
    )
}