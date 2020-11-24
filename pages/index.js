import { gql, useQuery } from '@apollo/client';

const GET_TAG_QUERY = gql`
    query GET_TAG_QUERY($name: String!){
        tag(name: $name){
            id
            name
        }
    }
`;

import Link from 'next/link';


function Index(props) {
    const { loading, error, data } = useQuery(GET_TAG_QUERY, { variables: { name: "test" } });
  
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
  
    return (
        <div>
            <p>Home: this is the tag: {data.tag.name}</p>
            <Link href="/hello"><a>to hello page</a></Link>
        </div>
    );
}

export default Index;