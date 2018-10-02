import React, { Component } from 'react';

import { generateRandomId } from "./utils";
import tasks from "./tasks.json";
import { getTasks } from "./task-svc";

function Loading() {
  return (
    <tr>
      <td colspan="2">Loading Tasks...</td>
    </tr>
  );
}

function TodoListItem(props) {
  return (
    <tr>
      <td>{props.task.taskName}</td>
      <td>
        <input type="checkbox" defaultChecked={props.task.finished} />
      </td>
    </tr>
  );
}

function NewTaskForm(props) {
  const onSubmit = evt => {
    evt.preventDefault();
    const newTaskInput = evt.target.elements.newTask;
    props.addNewTask(newTaskInput.value);
    newTaskInput.value = "";
  };
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="newTask" placeholder="Write Task Name" />
      <button type="submit">Add</button>
    </form>
  );
}

export default class TodoList extends Component {
  constructor(props) {
    super();
    this.state = { tasks, loaded: false };
    this.addNewTask = this.addNewTask.bind(this);
  }

  addNewTask(name) {
    const oldTodoList = this.state.tasks;
    const newTask = {
      taskName: name,
      finished: false,
      id: generateRandomId()
    };
    const newTodoList = [...oldTodoList, newTask];
    this.setState({ tasks: newTodoList });
  }

  componentDidMount() {
    // Request the cityNames from the API
    getTasks().then(tasks => {
      // Once they're loaded,
      this.setState({
        // Set the loading flag to false
        loaded: true,
        // And add the cityNames to the state.
        tasks
      });
    });
  }

  render() {
    if (!this.state.loaded) {
      return (
        <div className="container">
          <h1>
            Get It Done! <br />
            <small>For the truly industrious</small>
          </h1>

          <table>
            <thead>
              <tr>
                <td>Task</td>
                <td>Done?</td>
              </tr>
            </thead>
            <Loading />
          </table>

          <hr />
          <NewTaskForm addNewTask={this.addNewTask} />
        </div>
      );
    }

    const taskItems = this.state.tasks.map(task => (
      <TodoListItem key={task.id} task={task} defaultChecked={task.finished} />
    ));

    return (
      <div className="container">
        <h1>
          Get It Done! <br />
          <small>For the truly industrious</small>
        </h1>

        <table>
          <thead>
            <tr>
              <td>Task</td>
              <td>Done?</td>
            </tr>
          </thead>
          <tbody>{taskItems}</tbody>
        </table>

        <hr />
        <NewTaskForm addNewTask={this.addNewTask} />
      </div>
    );
  }
}