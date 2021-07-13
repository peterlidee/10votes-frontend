import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo'
import { MenuContextProvider } from '../components/context/MenuContext';
import { UserContextProvider } from '../components/context/UserContext';
import { UserItemsContextProvider } from '../components/context/UserItemsContext';
import { UserVotesContextProvider } from '../components/context/UserVotesContext';
import Page from '../components/Page';

// TODO: better providers? no nested clutter?

import '../sass/index.scss';

export default function App({ Component, pageProps }) {
    const apolloClient = useApollo(pageProps)
    return (
        <ApolloProvider client={apolloClient}>
            <UserContextProvider>
                <UserItemsContextProvider>
                    <UserVotesContextProvider>
                        <MenuContextProvider>
                            <Page>
                                <Component {...pageProps} />
                            </Page>
                        </MenuContextProvider>
                    </UserVotesContextProvider>
                </UserItemsContextProvider>
            </UserContextProvider>
        </ApolloProvider>
    )
}