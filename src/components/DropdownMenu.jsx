export default function DropdownMenu({
  buttonId,
  menuId,
  menuItems,
  menuTitle,
  icon,
  ariaLabel,
  handleSelection,
  selectedItem,
  isOpen,
  onToggle,
  hasDeleteAction,
}) {
  const handleClick = () => {
    onToggle(!isOpen);
  };

  const handleItemClick = (item) => {
    if (handleSelection) {
      handleSelection(item);
    }
    onToggle(false);
  };

  return (
    <div className="relative">
      <button
        id={buttonId}
        type="button"
        onClick={handleClick}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        <div className="flex h-6 w-6 items-center justify-center">
          <img src={icon} alt="" aria-hidden="true" />
        </div>
      </button>
      {isOpen && (
        <ul
          className="shadow-3xl absolute top-13 right-0 max-h-[300px] min-w-[114px] overflow-y-scroll rounded-lg bg-white px-250 py-150 text-sm whitespace-nowrap"
          id={menuId}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby={buttonId}
        >
          {menuTitle && (
            <li
              className="border-grey-100 text-grey-500 border-b pb-150"
              role="presentation"
            >
              {menuTitle}
            </li>
          )}
          {menuItems.map((item, index) => (
            <li
              className={`${item === selectedItem ? "font-bold" : ""} ${
                index === menuItems.length - 1 ? "" : "border-grey-100 border-b"
              } ${hasDeleteAction && index === menuItems.length - 1 ? "text-red" : ""} py-150 first:pt-0 last:pb-0`}
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
