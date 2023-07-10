import React from 'react';


class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      newTask: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/alesanchezr')
      .then(resp => resp.json())
      .then(data => this.setState({ tasks: data }))
      .catch(error => console.log(error));
  }

  addTask(newTask) {
    this.setState(
      prevState => ({ tasks: [...prevState.tasks, {label: newTask, done: false}] }),
      () => this.updateTasks() 
    );
  }

  deleteTask(index) {
    this.setState(
      prevState => ({ tasks: prevState.tasks.filter((task, i) => i !== index) }),
      () => this.updateTasks() 
    );
  }

  updateTasks() {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/alesanchezr', {
      method: "PUT",
      body: JSON.stringify(this.state.tasks),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
  }

  handleInputChange(event) {
    this.setState({newTask: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.newTask) {
      this.addTask(this.state.newTask);
      this.setState({newTask: ''});
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.newTask} onChange={this.handleInputChange} placeholder="New Task"/>
          <input type="submit" value="Add Task" />
        </form>
        <ul>
          {this.state.tasks.map((task, index) => 
            <li key={index}>{task.label} <button onClick={() => this.deleteTask(index)}>Delete</button></li>
          )}
        </ul>
      </div>
    );
  }
}

export default Home;
