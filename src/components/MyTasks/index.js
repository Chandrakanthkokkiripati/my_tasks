import {Component} from 'react'
import {v4} from 'uuid'

import Task from '../Task'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    taskInput: '',
    selectTag: tagsList[0].optionId,
    myTaskList: [],
    activeTag: 'INITIAL',
  }

  onSubmitForm = e => {
    e.preventDefault()
    const {taskInput, selectTag} = this.state
    const id = v4()
    this.setState(prevState => ({
      myTaskList: [...prevState.myTaskList, {id, taskInput, selectTag}],
      taskInput: '',
      selectTag: tagsList[0].optionId,
    }))
  }

  onChangeSearchInput = e => {
    this.setState({taskInput: e.target.value})
  }

  onChangeSelectTag = e => {
    this.setState({selectTag: e.target.value})
  }

  onClickTag = id => {
    this.setState(prevState => ({
      activeTag: prevState.activeTag === id ? 'INITIAL' : id,
    }))
  }

  render() {
    const {taskInput, selectTag, myTaskList, activeTag} = this.state
    const filteredList =
      activeTag === 'INITIAL'
        ? myTaskList
        : myTaskList.filter(eachTask => eachTask.selectTag === activeTag)
    return (
      <div className="app-container">
        <div className="create-task-container">
          <h1>Create a task!</h1>
          <form onSubmit={this.onSubmitForm} className="form-container">
            <div className="input-container">
              <label htmlFor="tasks">Task</label>
              <input
                value={taskInput}
                id="tasks"
                onChange={this.onChangeSearchInput}
                type="text"
                placeholder="Enter the task here"
              />
            </div>
            <div className="input-container">
              <label htmlFor="tags">Tags</label>
              <select
                id="tags"
                value={selectTag}
                onChange={this.onChangeSelectTag}
              >
                {tagsList.map(eachTag => (
                  <option value={eachTag.optionId} key={eachTag.optionId}>
                    {eachTag.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Add Task</button>
          </form>
        </div>
        <div className="tasks-container">
          <h1>Tags</h1>
          <ul className="tags-list-container">
            {tagsList.map(eachTag => (
              <Task
                onClickTag={this.onClickTag}
                key={eachTag.optionId}
                tag={eachTag}
                isActive={activeTag === eachTag.optionId}
              />
            ))}
          </ul>
          <h1>Tasks</h1>
          <ul className="tasks-list-container">
            {filteredList.length === 0 ? (
              <p className="no-task">No Tasks Added Yet</p>
            ) : (
              filteredList.map(eachTask => (
                <li className="task-item" key={eachTask.id}>
                  <p>{eachTask.taskInput}</p>
                  <p className="task-tag">{eachTask.selectTag.toLowerCase()}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default MyTasks
