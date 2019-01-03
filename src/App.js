import React, { Component } from 'react';
import './App.css';
import { ADD_TODO_QUERY, GET_ALL_TODOS, DELETE_SINGLE_TODO, UPDATE_TODO } from "./Queries";
import { api } from './Config'
import { request } from './Request'

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
  componentDidMount() {
    request('POST', api, GET_ALL_TODOS).then(res => {
      console.log(res)
      var todos = res.data.data.todos
      this.setState({ todos })
    }).catch(err => {
      console.log(err)
    })
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
    if (title === '' || description === '')
      alert('Please Provide title and description')
    else
      request('POST', api, ADD_TODO_QUERY, { title, description }).then(res => {
        console.log('ADD DATA======>',res)
        var todos = res.data.data.createTodo
        this.setState({ todos, title: '', description: '' })
      }).catch(err => {
        console.log(err)
      })
  }


  deleteTodo(id, ev) {
    request('POST', api, DELETE_SINGLE_TODO, { id }).then(res => {
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
    request('POST', api, UPDATE_TODO, { id: Number(id), title, description }).then(res => {
      var todos = res.data.data.updateTodo
      this.setState({ todos, changeAddBtn: false, title: '', description: '' })
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    const { title, description, changeAddBtn, todos } = this.state
    console.log(todos)
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

            todos !== null ? todos.length ? todos.map((val, ind) => {
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
            }) : <h3>No Todos Found</h3> : null
          }

        </header>
      </div>
    );
  }
}
export default App;