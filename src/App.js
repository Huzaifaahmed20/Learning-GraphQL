import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

const ADD_TODO_QUERY = `
mutation createTodo($title: String!, $description: String!) {
  createTodo(title: $title, description: $description) {
    id
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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      title: '',
      description: '',
      changeAddBtn: false,
      todos: []
    }
  }
  handleChange(ev) {
    var targetValue = ev.target.value;
    var targetName = ev.target.name;
    this.setState({
      [targetName]: targetValue
    })
  }
  addTodo() {
    const { title, description } = this.state;
    axios
      .post('http://localhost:4000/graphql', {
        query: ADD_TODO_QUERY,
        variables: {
          title, description
        },
      }).then(res => {
        var todos = res.data.data.createTodo
        this.setState({ todos, title: '', description: '' })
      })
      .catch(err => console.log('ERR---->', err))

  }

  componentDidMount() {
    axios.post('http://localhost:4000/graphql', {
      query: GET_ALL_TODOS,
      headers: {
        'Content-Type': 'application/graphql'
      }
    }).then(res => {
      var todos = res.data.data.todos
      this.setState({ todos })
    }).catch(err => {
      console.log(err)
    })
  }
  deleteTodo(id, ev) {
    axios.post('http://localhost:4000/graphql', {
      query: DELETE_SINGLE_TODO,
      headers: {
        'Content-Type': 'application/graphql'
      },
      variables: {
        id
      },
    }).then(res => {
      var todos = res.data.data.deleteTodo
      this.setState({ todos })
    }).catch(err => {
      console.log(err)
    })
  }
  editTodo(val, ev) {
    const { id, title, description } = val
    this.setState({
      changeAddBtn: true,
      id,
      title,
      description
    })

  }
  cancelHandler() {
    this.setState({
      changeAddBtn: false,
      id: null,
      title: '',
      description: ''
    })
  }
  updateTodo() {
    const { id, title, description } = this.state

    axios.post('http://localhost:4000/graphql', {
      query: UPDATE_TODO,
      headers: {
        'Content-Type': 'application/graphql'
      },
      variables: { id: Number(id), title: title, description: description }
    }).then(res => {
      var todos = res.data.data.updateTodo
      this.setState({ todos, changeAddBtn: false, title: '', description: '', })
    }).catch(err => {
      console.log('ERROR-------> ', err)
    })
  }
  render() {
    const { title, description, changeAddBtn, todos } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <h2>TODO App</h2>
          <input value={title} name='title' onChange={this.handleChange.bind(this)} className='title' placeholder='Todo Title ...' />
          <textarea value={description} name='description' onChange={this.handleChange.bind(this)} className='desc' placeholder='Todo Description ...' />

          {
            !changeAddBtn ? <button className='addTodo' onClick={this.addTodo.bind(this)}>Add</button> :
              <div>
                <button className='addTodo' onClick={this.updateTodo.bind(this)}>Update</button>
                <button className='addTodo' onClick={this.cancelHandler.bind(this)}>Cancel</button>
              </div>
          }

          {
            todos.length ? todos.map((val, ind) => {
              return (
                <div className='card' key={ind}>
                  <h2>{val.title}</h2>
                  <p>{val.description}</p>
                  <div className='buttonsDiv'>
                    <button onClick={this.editTodo.bind(this, val)}>Edit</button>
                    <button onClick={this.deleteTodo.bind(this, ind)}>Delete</button>
                  </div>
                </div>
              )
            }) : <h3>No Todos Created</h3>
          }

        </header>
      </div>
    );
  }
}
export default App;