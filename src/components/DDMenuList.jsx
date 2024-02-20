const DDMenuList = ({ menuOptions, functions, toggleMenu }) => {
  const handleClick = (index) => {
    if (functions[index]) {
      functions[index]();
      toggleMenu();
    }
  };
  return menuOptions.map((option, index) => (
    <li key={index} onClick={() => handleClick(index)}>
      {option}
    </li>
  ));
};

export default DDMenuList;
