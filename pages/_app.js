import App from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';
import '../sass/index.scss';


// testing all router click events
// we will also need to handle redirects!
import Router from 'next/router'

import MenuContext from '../components/header/MenuContext';
  
  



// const handleRouteChange = (url) => {
//     console.log('App is changing to: ', url)
// }

// Router.events.on('routeChangeComplete', handleRouteChange)

// Router.events.on('routeChangeError', (err, url) => {
//     if (err.cancelled) {
//         console.log(`Route to ${url} was cancelled!`)
//     }
// })






class MyApp extends App{

    constructor(props){
        super(props)
        this.state = { // we use state to feed MenuContext
            menuOpen: false,
            toggleMenu: this.toggleMenu,
        }

        // add router event,
        // everytime a link is clicked, close the menu (MenuContext) if it was open
        Router.events.on('routeChangeStart', this.resetMenu)
        // and handle possible error
        Router.events.on('routeChangeError', (err, url) => {
            if (err.cancelled) {
                // console.log(`Route to ${url} was cancelled!`)
                this.resetMenu()
            }
        })

    }

    static async getInitialProps({Component, ctx}){
        let pageProps = {};
        if(Component.getInitialProps){
            pageProps = await Component.getInitialProps(ctx);
        }
        // this exposes the query to the user
        pageProps.query = ctx.query;
        return { pageProps };
    }

    toggleMenu = () => { // gets called by menu button, changes MenuContext via state
        this.setState({
            menuOpen: !this.state.menuOpen
        });
    }
    resetMenu = () => { // gets called on routerchange, changes MenuContext via state
        if(this.state.menuOpen){
            this.setState({ menuOpen: false })
        }
    }

    render(){
        const { Component, pageProps, apollo } = this.props
        return(
            <ApolloProvider client={apollo}>
                <MenuContext.Provider value={this.state}>
                    <Page>
                        <Component {...pageProps} />
                    </Page>
                </MenuContext.Provider>
            </ApolloProvider>
        );
    }
}

export default withData(MyApp);