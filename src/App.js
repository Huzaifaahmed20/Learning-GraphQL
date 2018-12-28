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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
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
        this.setState({ todos })
      })
      .catch(err => console.log('ERR---->', err))

  }

  componentDidMount() {
    axios.get('http://localhost:4000/graphql', {
      query: GET_ALL_TODOS,
      variables:{}
    }).then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>TODO App</h2>
          <input name='title' onChange={this.handleChange.bind(this)} className='title' placeholder='Todo Title ...' />
          <textarea name='description' onChange={this.handleChange.bind(this)} className='desc' placeholder='Todo Description ...' />
          <button className='addTodo' onClick={this.addTodo.bind(this)}>Add</button>
          {
            this.state.todos.length ? this.state.todos.map((val, ind) => {
              return (
                <div key={ind}>
                  <h2>{val.title}</h2>
                  <p>{val.description}</p>
                  <hr />
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