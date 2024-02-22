import { useState, useEffect } from "react";
import "./App.css";
import FilterTasks from "./components/FilterTasks";
import MenuList from "./components/MenuList";
import Tasks from "./components/Tasks";
import TaskImportance from "./components/taskImportance";

function App({}) {
  const [isOpenAddNewTask, setIsOpenAddNewTask] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [sortTask, setSortTask] = useState(false);
  const [radioState, setRadioState] = useState(0);
  const [sortITask, setSortITask] = useState(false);
  const [sortCompletedTasks, setSortCompletedTasks] = useState(false);
  const [isOpenFilterMenu, setIsOpenFilterMenu] = useState(false);
  const [filters, setFilters] = useState({
    completed: false,
    toDo: false,
    importance01: false,
    importance02: false,
    importance03: false,
    importance04: false,
    importance05: false,
  });

  // USEEFFECT SECTION
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("localStorageTasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("localStorageTasks"))) {
      ApplyFilterTasks();
    }
  }, [filters]);

  // TOGGLE SECTION
  function toggleAddNewTask() {
    setIsOpenAddNewTask(!isOpenAddNewTask);
  }

  function toggleFilterMenu() {
    setIsOpenFilterMenu(!isOpenFilterMenu);
  }

  // HANDLE SECTION
  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleSortByImportance() {
    if (!sortITask) {
      sortTasksByImportance("important");
      setSortITask(true);
    } else {
      sortTasksByImportance("unimportant");
      setSortITask(false);
    }
  }

  function handleCompletedTasks() {
    if (!sortCompletedTasks) {
      sortTasksByCompletion("completed");
      setSortCompletedTasks(true);
    } else {
      sortTasksByCompletion("uncompleted");
      setSortCompletedTasks(false);
    }
  }

  function handleSortTasks() {
    if (!sortTask) {
      sortTasksByDateAndTime("oldToNew");
      setSortTask(true);
    } else {
      sortTasksByDateAndTime("newToOld");
      setSortTask(false);
    }
  }

  function handleRadioState(event) {
    setRadioState(event.target.value);
  }

  // ADD NEW TASK FUNCTION
  function addNewTask(event) {
    event.preventDefault();
    const uniqueIdGenerator = Math.floor(100000 + Math.random() * 900000);
    if (newTask.trim() !== "") {
      const task = {
        uniqueId: uniqueIdGenerator,
        completed: false,
        importance: parseInt(radioState),
        group: "none",
        description: newTask,
        createdAt: new Date().toISOString(),
      };
      setTasks([task, ...tasks]);
      setRadioState(0);
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
  function editTask(index, editedTaskText) {
    const editedTask = [...tasks];

    const updateTasksLocalStorage = JSON.parse(
      localStorage.getItem("localStorageTasks")
    );

    const taskIndexLocalStorage = updateTasksLocalStorage.findIndex(
      (task) => task.uniqueId === editedTask[index].uniqueId
    );

    updateTasksLocalStorage[taskIndexLocalStorage].description = editedTaskText;

    editedTask[index].description = editedTaskText;
    setTasks(editedTask);
    // Local storage
    localStorage.setItem(
      "localStorageTasks",
      JSON.stringify([...updateTasksLocalStorage])
    );
  }

  // REMOVE TASK
  function removeTask(index) {
    const updateTasks = [...tasks];

    const updateTasksLocalStorage = JSON.parse(
      localStorage.getItem("localStorageTasks")
    );

    const taskIndexLocalStorage = updateTasksLocalStorage.findIndex(
      (task) => task.uniqueId === updateTasks[index].uniqueId
    );

    updateTasksLocalStorage.splice(taskIndexLocalStorage, 1);

    updateTasks.splice(index, 1);
    setTasks(updateTasks);
    // Local storage
    localStorage.setItem(
      "localStorageTasks",
      JSON.stringify([...updateTasksLocalStorage])
    );
  }

  // MARK TASK AS COMPLETED OR UNCOMPLETED
  function taskCompleted(index) {
    const updatedTaskCompletion = [...tasks];
    updatedTaskCompletion[index].completed =
      !updatedTaskCompletion[index].completed;

    setTasks(updatedTaskCompletion);

    const updatedTaskCompletionLocalStorage = JSON.parse(
      localStorage.getItem("localStorageTasks")
    );

    const foundTaskInLocalStorage = updatedTaskCompletionLocalStorage.find(
      (task) => task.uniqueId === updatedTaskCompletion[index].uniqueId
    );
    const updatedTasks = updatedTaskCompletionLocalStorage.map((task) => {
      if (task.uniqueId === foundTaskInLocalStorage.uniqueId) {
        task.completed = !task.completed;
        return task;
      }
      return task;
    });
    // Local storage
    localStorage.setItem(
      "localStorageTasks",
      JSON.stringify([...updatedTasks])
    );
    sortTasksByCompletion("uncompleted");
  }

  function handleSearchInput(event) {
    search(event.target.value);
  }

  // SEARCH TASK FUNCTION
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

  // SORT TASKS BY DATE AND TIME
  function sortTasksByDateAndTime(order) {
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

  // IMPORTANCE SORT
  function sortTasksByImportance(order) {
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
  function sortTasksByCompletion(order) {
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
  }

  function changeTaskImportance(bool, index) {
    const changeImportance = [...tasks];

    const updateTasksLocalStorage = JSON.parse(
      localStorage.getItem("localStorageTasks")
    );

    const taskIndexLocalStorage = updateTasksLocalStorage.findIndex(
      (task) => task.uniqueId === changeImportance[index].uniqueId
    );

    if (bool && changeImportance[index].importance < 4) {
      changeImportance[index].importance++;
      updateTasksLocalStorage[taskIndexLocalStorage].importance++;
    } else if (!bool && changeImportance[index].importance > 0) {
      changeImportance[index].importance--;
      updateTasksLocalStorage[taskIndexLocalStorage].importance--;
    }
    setTasks(changeImportance);
    // Local storage
    localStorage.setItem(
      "localStorageTasks",
      JSON.stringify([...updateTasksLocalStorage])
    );
  }

  // FILTER TASKS FUNCTION
  function filterTasks(option) {
    if (option === "Completed") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        completed: !prevFilters.completed,
      }));
      if (filters.toDo) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          toDo: !prevFilters.toDo,
        }));
      }
    }
    if (option === "To do") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        toDo: !prevFilters.toDo,
      }));
      if (filters.completed) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          completed: !prevFilters.completed,
        }));
      }
    }
    if (option === "44ce1b") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        importance01: !prevFilters.importance01,
      }));
    }
    if (option === "bbdb44") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        importance02: !prevFilters.importance02,
      }));
    }
    if (option === "f7e379") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        importance03: !prevFilters.importance03,
      }));
    }
    if (option === "f2a134") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        importance04: !prevFilters.importance04,
      }));
    }
    if (option === "e51f1f") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        importance05: !prevFilters.importance05,
      }));
    }
  }

  // APPLY FILTER FUNCTION
  function ApplyFilterTasks() {
    const tasks = JSON.parse(localStorage.getItem("localStorageTasks"));

    const filteredTasks = tasks.filter((task) => {
      if (
        (filters.completed && filters.importance01) ||
        (filters.completed && filters.importance02) ||
        (filters.completed && filters.importance03) ||
        (filters.completed && filters.importance04) ||
        (filters.completed && filters.importance05)
      ) {
        if (
          (filters.importance01 && task.importance === 0 && task.completed) ||
          (filters.importance02 && task.importance === 1 && task.completed) ||
          (filters.importance03 && task.importance === 2 && task.completed) ||
          (filters.importance04 && task.importance === 3 && task.completed) ||
          (filters.importance05 && task.importance === 4 && task.completed)
        ) {
          return true;
        } else {
          return false;
        }
      } else if (filters.completed) {
        return task.completed;
      }

      if (
        (filters.toDo && filters.importance01) ||
        (filters.toDo && filters.importance02) ||
        (filters.toDo && filters.importance03) ||
        (filters.toDo && filters.importance04) ||
        (filters.toDo && filters.importance05)
      ) {
        if (
          (filters.importance01 && task.importance === 0 && !task.completed) ||
          (filters.importance02 && task.importance === 1 && !task.completed) ||
          (filters.importance03 && task.importance === 2 && !task.completed) ||
          (filters.importance04 && task.importance === 3 && !task.completed) ||
          (filters.importance05 && task.importance === 4 && !task.completed)
        ) {
          return true;
        } else {
          return false;
        }
      } else if (filters.toDo && !task.completed) {
        return !task.completed;
      }

      if (
        (filters.importance01 && task.importance === 0) ||
        (filters.importance02 && task.importance === 1) ||
        (filters.importance03 && task.importance === 2) ||
        (filters.importance04 && task.importance === 3) ||
        (filters.importance05 && task.importance === 4)
      ) {
        return task;
      }

      if (!Object.values(filters).some((filter) => filter === true)) {
        return true;
      }
    });

    setTasks(filteredTasks);
  }

  // HTML SECTION
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
            <form onSubmit={(event) => addNewTask(event)}>
              <textarea
                value={newTask}
                onChange={(event) => handleInputChange(event)}
                required
              ></textarea>
              <p>Please select how important is this task:</p>
              <div className="input-task-importance-radio">
                <TaskImportance
                  handleRadioState={handleRadioState}
                ></TaskImportance>
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
          <button
            onClick={() => handleCompletedTasks()}
            style={{ width: "2.5rem" }}
          >
            &#x2713; &#x25b4; &#x25be;
          </button>
        </div>
        <div></div>
        <div>
          <button
            onClick={() => handleSortByImportance()}
            style={{ width: "2rem" }}
          >
            ! &#x25b4; &#x25be;
          </button>
        </div>
        <div>
          <button onClick={(event) => handleSortTasks(event)}>
            D & T &#x25b4; &#x25be;
          </button>
        </div>
        <div>
          <button style={{ width: "2rem" }} onClick={() => toggleFilterMenu()}>
            <img
              src="/filter.svg"
              alt="Filter image"
              style={{ width: "0.9rem" }}
            />
          </button>
          {isOpenFilterMenu && (
            <div className="filter-tasks-options-container">
              <FilterTasks
                filterTasks={filterTasks}
                filters={filters}
              ></FilterTasks>
            </div>
          )}
        </div>
      </div>
      <div className="task-container">
        <Tasks
          tasks={tasks}
          removeTask={removeTask}
          taskCompleted={taskCompleted}
          submitEditTask={editTask}
          changeTaskImportance={changeTaskImportance}
        ></Tasks>
      </div>
    </>
  );
}

export default App;
