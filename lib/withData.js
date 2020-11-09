import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint, prodEndPoint } from '../config';

function createClient({ headers }){
    // console.log('what is process.env?', process.env.NODE_ENV);
    // console.log('what is prodEndPoint?', prodEndPoint)
    //console.log('what is headers?', headers)

  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndPoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
        // headers: {
        //     cookie: headers && headers.cookie // NOTE: client-side headers is undefined!
        // },
      });
    },
  });
}

export default withApollo(createClient);
