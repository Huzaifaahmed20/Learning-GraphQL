
const ADD_TODO_QUERY = `
mutation createTodo($title: String!, $description: String!) {
  createTodo(title: $title, description: $description) {
    title
    description
  }
}
`;

const GET_ALL_TODOS = `
query todos {
  todos {
    id
    title
    description
  }
}
`

const DELETE_SINGLE_TODO = `
mutation deleteTodo($id:Int!) {
  deleteTodo(id: $id) {
    id
    title
    description
  }
}
`

const UPDATE_TODO = `
mutation updateTodo($id: Int!, $title: String, $description: String) {
  updateTodo(id: $id, title: $title, description: $description) {
    id
    title
    description
  }
}
`



export { ADD_TODO_QUERY, GET_ALL_TODOS, DELETE_SINGLE_TODO, UPDATE_TODO }