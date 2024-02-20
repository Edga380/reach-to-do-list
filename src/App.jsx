import { useState, useEffect } from "react";
import "./App.css";
import MenuList from "./components/MenuList";
import Tasks from "./components/Tasks";

function App({}) {
  const [isOpenAddNewTask, setIsOpenAddNewTask] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [sortTask, setSortTask] = useState(false);
  const [radioState, setRadioState] = useState();
  const [sortITask, setSortITask] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("localStorageTasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  function toggleAddNewTask() {
    setIsOpenAddNewTask(!isOpenAddNewTask);
  }

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(radioState);
    if (newTask.trim() !== "") {
      const task = {
        completed: false,
        importance: parseInt(radioState),
        group: "none",
        description: newTask,
        createdAt: new Date().toISOString(),
      };
      setTasks([task, ...tasks]);
      // Local storage
      localStorage.setItem(
        "localStorageTasks",
        JSON.stringify([task, ...tasks])
      );
      setNewTask("");
      setIsOpenAddNewTask(!isOpenAddNewTask);
    }
  }

  // EDITED TASK SUBMIT
  function submitEditTask(index, editedTaskText) {
    const submitEditTask = [...tasks];
    submitEditTask[index].description = editedTaskText;
    setTasks(submitEditTask);
    localStorage.removeItem("localStorageTasks");
    localStorage.setItem("localStorageTasks", JSON.stringify(submitEditTask));
  }

  // REMOVE TASK
  function removeTask(index) {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    localStorage.removeItem("localStorageTasks");
    localStorage.setItem("localStorageTasks", JSON.stringify(updatedTasks));
  }

  // TASK COMPLETED
  function taskCompleted(index) {
    const updatedTaskCompletion = [...tasks];
    updatedTaskCompletion[index].completed =
      !updatedTaskCompletion[index].completed;

    setTasks(updatedTaskCompletion);
    filterTasks("uncompleted");
  }
  //localStorage.clear();

  function handleSearchInput(event) {
    search(event.target.value);
  }

  // SEARCH
  function search(searchText) {
    const storedTasks = JSON.parse(localStorage.getItem("localStorageTasks"));
    const replaceSpaces = searchText.toLowerCase().split(" ").join("|");
    const regex = new RegExp(replaceSpaces);
    const searchResults = storedTasks
      .map((task, index) => ({ task, index }))
      .filter(({ task }) => task.description.toLowerCase().match(regex))
      .map(({ index }) => index);
    const filteredTasks = storedTasks.filter((_, index) =>
      searchResults.includes(index)
    );
    setTasks(filteredTasks);
  }

  // SORT
  function sortTasks(order) {
    const sortedTasks = [...tasks].sort((compareTo, compareWith) => {
      const compTo = new Date(compareTo.createdAt);
      const compWith = new Date(compareWith.createdAt);

      if (order === "oldToNew") {
        return compTo - compWith;
      } else if (order === "newToOld") {
        return compWith - compTo;
      }
    });
    setTasks(sortedTasks);
  }

  function handleSortITasks() {
    if (!sortITask) {
      importanceSort("important");
      setSortITask(true);
    } else {
      importanceSort("unimportant");
      setSortITask(false);
    }
  }

  // IMPORTANCE SORT
  function importanceSort(order) {
    const sortTasks = [...tasks].sort((compA, compB) => {
      const comA = compA.importance;
      const comB = compB.importance;

      if (order === "important") {
        return comA - comB;
      } else if (order === "unimportant") {
        return comB - comA;
      }
    });
    setTasks(sortTasks);
  }

  // FILTER
  function filterTasks(order) {
    const sortedTasks = [...tasks].sort((compareTo, compareWith) => {
      const compTo = compareTo.completed;
      const compWith = compareWith.completed;

      if (order === "completed") {
        if (compTo && !compWith) return -1;
        else return 1;
      } else if (order === "uncompleted") {
        if (!compTo && compWith) return -1;
        else return 1;
      }
    });
    setTasks(sortedTasks);
    // Tasks saved
    localStorage.removeItem("localStorageTasks");
    localStorage.setItem("localStorageTasks", JSON.stringify(sortedTasks));
  }

  function handleCompletedTasks(event) {
    if (event.target.checked) {
      filterTasks("completed");
    } else {
      filterTasks("uncompleted");
    }
  }

  function handleSortTasks() {
    if (!sortTask) {
      sortTasks("oldToNew");
      setSortTask(true);
    } else {
      sortTasks("newToOld");
      setSortTask(false);
    }
  }

  function handleRadioState(event) {
    setRadioState(event.target.value);
  }

  return (
    <>
      <div className="list-name">
        <h2>To Do List</h2>
      </div>
      <div className="add-task-container">
        <div>
          <button
            className="big-button"
            onClick={(event) => toggleAddNewTask(event)}
          >
            Add task
          </button>
        </div>
        {isOpenAddNewTask && (
          <div className="add-task-input">
            <form onSubmit={(event) => handleFormSubmit(event)}>
              <textarea
                value={newTask}
                onChange={(event) => handleInputChange(event)}
                required
              ></textarea>
              <p>Please select how important is this task:</p>
              <div className="input-task-importance-radio">
                <input
                  className="task-importance-radio task-importance-radio-44ce1b"
                  type="radio"
                  id="impotance0"
                  name="importance"
                  value="0"
                  onChange={(event) => handleRadioState(event)}
                />
                <label htmlFor="impotance0"></label>
                <input
                  className="task-importance-radio task-importance-radio-bbdb44"
                  type="radio"
                  id="impotance1"
                  name="importance"
                  value="1"
                  onChange={(event) => handleRadioState(event)}
                />
                <label htmlFor="impotance1"></label>
                <input
                  className="task-importance-radio task-importance-radio-f7e379"
                  type="radio"
                  id="impotance2"
                  name="importance"
                  value="2"
                  onChange={(event) => handleRadioState(event)}
                />
                <label htmlFor="impotance2"></label>
                <input
                  className="task-importance-radio task-importance-radio-f2a134"
                  type="radio"
                  id="impotance3"
                  name="importance"
                  value="3"
                  onChange={(event) => handleRadioState(event)}
                />
                <label htmlFor="impotance3"></label>
                <input
                  className="task-importance-radio task-importance-radio-e51f1f"
                  type="radio"
                  id="impotance4"
                  name="importance"
                  value="4"
                  onChange={(event) => handleRadioState(event)}
                />
                <label htmlFor="impotance4"></label>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search task"
          onChange={(event) => handleSearchInput(event)}
          required
        />{" "}
      </div>
      <div className="task-menu-container">
        <div>
          <input
            type="checkbox"
            onChange={(event) => handleCompletedTasks(event)}
          />
        </div>
        <div></div>
        <div>
          <button onClick={() => handleSortITasks()} style={{ width: "2rem" }}>
            &#x25b4; &#x25be;
          </button>
        </div>
        <div>
          <button onClick={(event) => handleSortTasks(event)}>
            D & T &#x25b4; &#x25be;
          </button>
        </div>
        <div></div>
      </div>
      <div className="task-container">
        <Tasks
          tasks={tasks}
          removeTask={removeTask}
          taskCompleted={taskCompleted}
          submitEditTask={submitEditTask}
        ></Tasks>
      </div>
    </>
  );
}

export default App;
