export default function DropdownMenu({
  buttonId,
  menuId,
  menuItems,
  menuTitle,
  icon,
  iconAltText,
  handleSelectedCategory,
  selectedCategory,
  handleSortChange,
  selectedSortOption,
  isOpen,
  onToggle,
}) {
  const handleClick = () => {
    onToggle(!isOpen);
  };

  const handleItemClick = (item) => {
    if (handleSelectedCategory) {
      handleSelectedCategory(item);
    }
    if (handleSortChange) {
      handleSortChange(item);
    }
  };

  return (
    <div className="relative">
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
          className="shadow-3xl absolute top-13 right-0 max-h-[300px] min-w-[177px] overflow-y-scroll rounded-lg bg-white px-250 py-150 text-sm"
          id={menuId}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby={buttonId}
        >
          <p
            className="border-grey-100 text-grey-500 border-b pb-150"
            role="presentation"
          >
            {menuTitle}
          </p>
          {menuItems.map((item, index) => (
            <li
              className={`${item === selectedCategory || item === selectedSortOption ? "font-bold" : ""} ${
                index === menuItems.length - 1 ? "" : "border-grey-100 border-b"
              } py-150`}
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
    </div>
  );
}
