import { useState } from "react";

export default function DropdownMenu({
  buttonId,
  menuId,
  menuItems,
  menuTitle,
  icon,
  iconAltText,
  handleSelectedCategory,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    if (handleSelectedCategory) {
      handleSelectedCategory(item); // Call the passed handler
    }
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <>
      <button
        id={buttonId}
        onClick={handleClick}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <img src={icon} alt={iconAltText} />
      </button>
      {isOpen && (
        <ul
          id={menuId}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby={buttonId}
        >
          <p role="presentation">{menuTitle}</p>
          {menuItems.map((item, index) => (
            <li
              key={`${item}-${index}`}
              role="menuitem"
              tabIndex={0}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
