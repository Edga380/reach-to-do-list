import { useState } from "react";
import DDMenuList from "./DDMenuList";

const DropDownMenu = ({ name, menuOptions, setClassName, functions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button className={setClassName} onClick={toggleMenu}>
        {name}
      </button>
      {isOpen && (
        <div className="dropdown-list">
          <ul>
            <DDMenuList
              menuOptions={menuOptions}
              functions={functions}
              toggleMenu={toggleMenu}
            ></DDMenuList>
          </ul>
        </div>
      )}
    </>
  );
};

export default DropDownMenu;
