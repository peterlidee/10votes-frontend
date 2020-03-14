import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY{
        itemsConnection{
            aggregate{
                count
            }
        }
    }
`

const Pagination = props => (
    <Query query={PAGINATION_QUERY}>
        {({ error, loading, data }) => {
            if(loading) return <p>Loading...</p>
            // the total number of items
            const count = data.itemsConnection.aggregate.count;
            const pages = Math.ceil(count / perPage);
            // the url query, current page
            const page = props.page;
            return(
                <div>
                    <Head><title>10 votes | page {page} of {pages}</title></Head>
                    <Link 
                        prefetch
                        href={{
                            pathname: 'items',
                            query: { page: page - 1 },
                        }
                    }>
                        <a aria-disabled={page <= 1}>prev</a>
                    </Link>
                    <p>Page {page} of {pages}</p>
                    <p>{count} items total</p>
                    <Link 
                        prefetch
                        href={{
                            pathname: 'items',
                            query: { page: page >= pages ? page : page + 1 },
                        }
                    }>
                        <a aria-disabled={page >= pages}>next</a>
                    </Link>
                </div>
            );
        }}
    </Query>
);

export default Pagination;