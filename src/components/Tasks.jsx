import { useState } from "react";
import DropDownMenu from "./DropDownMenu";
import EditTask from "./EditTask";

const Tasks = ({
  tasks,
  removeTask,
  taskCompleted,
  submitEditTask,
  changeTaskImportance,
}) => {
  const [isOpenEditTask, setIsOpenEditTask] = useState(
    Array(tasks.length).fill(false)
  );

  function taskImportanceColor(number) {
    switch (number) {
      case 0:
        return "#44ce1b";
      case 1:
        return "#bbdb44";
      case 2:
        return "#f7e379";
      case 3:
        return "#f2a134";
      case 4:
        return "#e51f1f";
      default:
        return;
    }
  }

  function editTask(index) {
    const updatedOpenEditTask = [...isOpenEditTask];
    updatedOpenEditTask[index] = !updatedOpenEditTask[index];
    setIsOpenEditTask(updatedOpenEditTask);
  }

  function closeEditTask(index) {
    const updatedOpenEditTask = [...isOpenEditTask];
    updatedOpenEditTask[index] = false;
    setIsOpenEditTask(updatedOpenEditTask);
  }

  const allTasks = tasks.map((task, index) => (
    <div key={index} className="task">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => taskCompleted(index)}
      ></input>
      <div>
        {!isOpenEditTask[index] && <p>{task.description}</p>}
        {isOpenEditTask[index] && (
          <EditTask
            submitEditTask={(editedTaskText) =>
              submitEditTask(index, editedTaskText)
            }
            taskDescription={task.description}
            closeEditTask={() => closeEditTask(index)}
          ></EditTask>
        )}
      </div>
      <div className="task-importance">
        {!isOpenEditTask[index] && (
          <div
            className="task-importance-indicator"
            style={{ backgroundColor: taskImportanceColor(task.importance) }}
          ></div>
        )}
        {isOpenEditTask[index] && (
          <div className="edit-task-importance-button-container">
            <button
              style={{ width: "1rem" }}
              onClick={() => changeTaskImportance(true, index)}
            >
              &#x25b4;
            </button>
            <div
              className="task-importance-indicator"
              style={{ backgroundColor: taskImportanceColor(task.importance) }}
            ></div>
            <button
              style={{ width: "1rem" }}
              onClick={() => changeTaskImportance(false, index)}
            >
              &#x25be;
            </button>
          </div>
        )}
      </div>
      <div className="task-createAt">
        {task.createdAt.slice(0, 10)}
        <br></br>
        Time: {task.createdAt.slice(11, 16)}
      </div>
      <div className="task-menu-options">
        <DropDownMenu
          name="---"
          menuOptions={["Edit", "Remove"]}
          setClassName={"small-button"}
          functions={[() => editTask(index), () => removeTask(index)]}
        ></DropDownMenu>
      </div>
    </div>
  ));
  return allTasks;
};

export default Tasks;
