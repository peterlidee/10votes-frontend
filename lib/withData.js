//import withApollo from 'next-with-apollo';
//import ApolloClient from 'apollo-boost';
import { endpoint, prodEndPoint } from '../config';


// import { withApollo } from "next-apollo";
// import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
 
/*const apolloClient = new ApolloClient({
    uri: "https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn",
  
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link: createHttpLink({
        uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndPoint,
        credentials: 'include',
        headers: {
            cookie: req.header('Cookie'),
        },
    }),
    cache: new InMemoryCache(),

});
 
export default withApollo(apolloClient);*/

function createClient({ headers }){
    return new ApolloClient({
        // don't need this cause we use link

        //uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndPoint,
  
        ssrMode: true,
        // Remember that this is the interface the SSR server will use to connect to the
        // API server, so we need to ensure it isn't firewalled, etc
        link: createHttpLink({
            uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndPoint,
            credentials: 'include',
            headers,
        }),
        cache: new InMemoryCache(),
    });
}

// function createClient({ headers }){
//   return new ApolloClient({
//     uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndPoint,

//     request: operation => {
//       operation.setContext({
//         fetchOptions: {
//           credentials: 'include',
//         },
//         headers,
//       });
//     },
//   });
// }

// export default withApollo(createClient);


import { withApollo } from "next-apollo";
import { ApolloClient, InMemoryCache, createHttpLink, HttpLink, } from "@apollo/client";

const link = new HttpLink({ 
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndPoint,
    credentials: 'include', 
});

const apolloClient = new ApolloClient({
    // don't need this cause we use link

    // uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndPoint,
    // credentials: 'include',

    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    // link: createHttpLink({
    //     uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndPoint,
    //     credentials: 'include',
    //     //headers,
    // }),
    link,

    cache: new InMemoryCache(),
});
 
export default withApollo(apolloClient);
