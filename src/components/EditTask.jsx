import { useEffect, useRef, useState } from "react";

const EditTask = ({ submitEditTask, taskDescription, closeEditTask }) => {
  const [editedTaskText, setEditedTaskText] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    setEditedTaskText(taskDescription);
  }, [taskDescription]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  });

  function handleFormSubmit(event) {
    event.preventDefault();
    submitEditTask(editedTaskText);
    setEditedTaskText("");
    closeEditTask();
  }

  function handleInputChange(event) {
    setEditedTaskText(event.target.value);
  }

  return (
    <form className="edit-task-container" onSubmit={handleFormSubmit}>
      <textarea
        ref={textareaRef}
        value={editedTaskText}
        onChange={handleInputChange}
        name="editedTask"
        id="editedTask"
        required
      ></textarea>
      <button>Submit</button>
    </form>
  );
};

export default EditTask;
