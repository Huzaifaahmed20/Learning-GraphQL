var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
var app = express();

var schema = buildSchema(`
type Query {
    title: String
    description: String
    todos: [Todo]
  }
type Mutation {
    createTodo(id: Int, title: String!, description: String!): [Todo]
}
type Todo {
    id: ID!
    title: String!
    description: String!
  }
`);
var todoArr = []
var addTodo = function ({ title, description }) {
    console.log('in func')
    var chatObj = {
        id: todoArr.length,
        title: title,
        description: description
    }
    todoArr.push(chatObj)
    return todoArr
}


var getTodos = function () {
    // if (args.title)
    //     return todoArr.filter(obj => obj.title === args.title)
    // else
        return todoArr;
}

var root = {
    createTodo: addTodo,
    // course: getCourse,
    todos: getTodos,
    // updateCourseTopic: updateCourseTopic
};


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
