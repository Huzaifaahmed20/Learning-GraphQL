import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { ApolloProvider } from 'react-apollo';
// import { ApolloClient } from 'apollo-client';
// import { HttpLink } from 'apollo-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import {  split } from 'apollo-client-preset'
// import { WebSocketLink } from 'apollo-link-ws'
// import { getMainDefinition } from 'apollo-utilities'
// const wsLink = new WebSocketLink({
//   uri: 'localhost:4000/graphql',
//   options: {
//     reconnect: true
//   }
// })
// const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })
// const link = split(

//     ({ query }) => {
//         const { kind, operation } = getMainDefinition(query)
//         return kind === 'OperationDefinition' && operation === 'subscription'
//     },
//     // wsLink,
//     httpLink,
// )
// const client = new ApolloClient({
//     link,
//     cache: new InMemoryCache()
// })
ReactDOM.render(
    // <ApolloProvider client={client}>
    <App />,
    // </ApolloProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
