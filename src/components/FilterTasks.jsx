const filterTasksOptions = [
  "Completed",
  "To do",
  "44ce1b",
  "bbdb44",
  "f7e379",
  "f2a134",
  "e51f1f",
];

const FilterTasks = ({ filterTasks, filters }) => {
  const handleCheckBoxChange = (option) => {
    filterTasks(option);
  };
  const filterKeys = Object.keys(filters);
  return filterTasksOptions.map((option, index) => (
    <div className="filter-tasks-option" key={index}>
      <input
        type="checkbox"
        checked={filters[filterKeys[index]]}
        style={{ margin: "0.2rem" }}
        onChange={() => handleCheckBoxChange(option)}
      />
      {option === "Completed" || option === "To do" ? (
        <a style={{ margin: "0.2rem" }}>{option}</a>
      ) : (
        <div
          className={`filter-option-importance`}
          style={{ backgroundColor: `#${option}` }}
        ></div>
      )}
    </div>
  ));
};

export default FilterTasks;
