import { root } from './Controllers'
import { schema } from './Schema';
import mongoose from 'mongoose';
import express_graphql from 'express-graphql'

export function registerRoutesAndStartServer(app) {
    
    mongoose.connect('mongodb://127.0.0.1:27017/todo');
    mongoose.Promise = global.Promise;
    mongoose.connection.on('error', (err) => {
      console.error(`Error!: ${err.message}`);
    });
    
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'XMLHttpRequest, X-Requested-With, Content-Type, Cache-Control, Authorization');
        if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            return res.end();
        } else {
            return next();
        }
    });

    app.use('/graphql', express_graphql({
        schema: schema,
        rootValue: root,
        graphiql: true
    }));

    app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
}

