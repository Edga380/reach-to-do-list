import "./menuList.css";
import DropDownMenu from "./DropDownMenu";

const MenuList = ({ sortTasks, filterTasks }) => {
  const sortOptions = ["Oldest", "Newest"];
  const filterOptions = [
    "Completed",
    "Uncompleted",
    "Priority High",
    "Priority Low",
  ];
  return (
    <>
      <div className="dropdown-button-container">
        <DropDownMenu
          name="Sort"
          menuOptions={sortOptions}
          functions={[() => sortTasks("oldToNew"), () => sortTasks("newToOld")]}
        ></DropDownMenu>
      </div>
      <div className="dropdown-button-container">
        <DropDownMenu
          name="Filter"
          menuOptions={filterOptions}
          functions={[
            () => filterTasks("completed"),
            () => filterTasks("uncompleted"),
          ]}
        ></DropDownMenu>
      </div>
    </>
  );
};

export default MenuList;
