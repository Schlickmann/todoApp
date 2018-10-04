import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import Header from './components/header.js'
import NewItem from './components/newItem.js';
import Item from './components/item.js';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoName: '',
      todoDescription: '',
      todoAddendum: '',
      todoDone: false,
      todos: []
    };

    this.definingTodoName = this.definingTodoName.bind(this);
    this.definingTodoDescription = this.definingTodoDescription.bind(this);
    this.definingAddendum = this.definingAddendum.bind(this);
    this.handleUpdTodo = this.handleUpdTodo.bind(this);
    this.handleDelTodo = this.handleDelTodo.bind(this);
    this.handleGetTodo = this.handleGetTodo.bind(this);
    this.handleNewTodo = this.handleNewTodo.bind(this);
    this.changeColorDone = this.changeColorDone.bind(this);
  }

  componentDidMount() {
    this.handleGetTodo();
  }

  definingTodoName = (ev) => {
    this.setState({ todoName: ev.target.value });
  }

  definingTodoDescription = (ev) => {
    this.setState({ todoDescription: ev.target.value });
  }

  definingAddendum = (ev) => {
    this.setState({ todoAddendum: ev.target.value });
  }

  handleGetTodo = async (event) => {
    const response = await axios.get('http://localhost:5555/todos');
    console.log(response);
    this.setState({ todos: response.data });

    this.state.todos.forEach(todo => {
      this.changeColorDone(todo._id, todo.todoDone);
    });
    
  }

  handleNewTodo = async (event) => {
    event.preventDefault();
    console.log(this.state.todoName)
    if (!this.state.todoName) return;

    const response = await axios.post('http://localhost:5555/todos', { todoName: this.state.todoName, todoDescription: this.state.todoDescription, todoAddendum: this.state.todoAddendum, todoDone: false });
    this.setState({ todos: [...this.state.todos, response.data], todoName: '', todoDescription: '', todoAddendum: '' });
  }

  handleDelTodo = (event, id) => {
    event.preventDefault();

    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const response = await axios.delete(`http://localhost:5555/todos/${id}`);
            this.handleGetTodo();
          }
        },
        {
          label: 'No',
          onClick: () => false
        }
      ]
    })
  }

  handleUpdTodo = (event, id) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value});

    confirmAlert({
      title: 'Confirm to Update',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const response = await axios.put(`http://localhost:5555/todos/${id}`, { todoDone: this.state.todoDone });
            this.setState({ todos: [...this.state.todos, response.data] });
            this.changeColorDone(id, this.state.todoDone); 
            this.handleGetTodo();
          }
        },
        {
          label: 'No',
          onClick: () => false
        }
      ]
    })
  }

  changeColorDone = (id, insert) => {
    let divTodo = document.getElementById(`${id}`);

    insert ? divTodo.classList.add('done') : divTodo.classList.remove('done');
  }

  render() {
    return (
      <div className="App">
        <Header />
        <NewItem 
          insertItem={this.handleNewTodo} 
          state={this.state} 
          definingTodoName={this.definingTodoName}
          definingTodoDescription={this.definingTodoDescription}
          definingAddendum={this.definingAddendum}
        />

        <ul id="App-ul">
          {
            
            this.state.todos.map( todo => (
              <Item 
                key={todo._id} 
                todo={todo} 
                updateItem={this.handleUpdTodo} 
                deleteItem={this.handleDelTodo} />
            ))
          }
        </ul>
      </div>
    );
  }
}

export default App;
