var { buildSchema } = require('graphql');

export const schema = buildSchema(`
type Query {
    title: String
    description: String
    todos: [Todo]
  }
type Mutation {
    createTodo(title: String!, description: String!): [Todo]
    updateTodo(title: String, description: String): [Todo]
  }
  type Todo {
    title: String!
    description: String!
  }
`);
  // deleteTodo(i): [Todo]