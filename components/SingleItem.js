import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import Error from './Error';
import Head from 'next/head';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($itemId: ID!){
        item(where : {id: $itemId}){
            id
            largeImage
            location{
                id
                name
                country{
                    id
                    name
                }
            }
            tags{
                name
                id
            }
        }
    }
`;

class SingleItem extends Component{
    render(){
        return(
            <Query query={ SINGLE_ITEM_QUERY } variables={{ itemId: this.props.id }}>
                {( { error, loading, data } ) => {
                    if(error) return <Error error={error} />
                    if(loading) return <p>loading ...</p>
                    if(!data.item) return <p>No item found for {this.props.id}</p>
                    console.log('data', data)
                    const {item} = data;
                    return(
                        <div>
                            <Head><title>10 votes | {data.item.title}</title></Head>
                            Single Item Component, {this.props.id}
                            <p>{data.item.title}</p>
                            <img src={data.item.largeImage} alt={data.item.title} width="150" />
                            <div>location: {item.location.name} - {item.location.country.name}</div>
                            <div>tags: {item.tags.map(tag => <span key={tag.id}>#{tag.name}</span>)}</div>
                        </div>
                    )
                }}
            </Query>
        );
    }
}

export default SingleItem;