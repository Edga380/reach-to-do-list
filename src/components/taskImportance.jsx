const importanceLevel = [
  { level: 0, class: "44ce1b" },
  { level: 1, class: "bbdb44" },
  { level: 2, class: "f7e379" },
  { level: 3, class: "f2a134" },
  { level: 4, class: "e51f1f" },
];

const TaskImportance = ({ handleRadioState }) => {
  return importanceLevel.map((ilevel, index) => (
    <>
      <input
        className={`task-importance-radio task-importance-radio-${ilevel.class}`}
        key={index}
        type="radio"
        id={`importance${ilevel.level.toString()}`}
        name="importance"
        value={ilevel.level}
        onChange={(event) => handleRadioState(event)}
      />
      <label htmlFor={`importance${ilevel.level.toString()}`}></label>
    </>
  ));
};

export default TaskImportance;
