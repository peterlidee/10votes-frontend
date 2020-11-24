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

function Hello(props) {
    const { loading, error, data } = useQuery(GET_TAG_QUERY, { variables: { name: "test3" } });
  
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    if (!data.tag || !data.tag.name) return 'No data available';
  
    return (
        <div>
            <p>HELLO PAGE: this is the tag: {data.tag.name}</p>
            <Link href="/"><a>home</a></Link>
        </div>
    );
}

export default Hello;