import { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import EllipsisIcon from "../assets/images/icon-ellipsis.svg";

export default function CategoryCardHeader({ name, theme }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-400 flex items-center justify-between">
      <div>
        <div
          className={`bg-${theme} mr-200 inline-block h-200 w-200 rounded-full`}
        ></div>
        <h2 className="text-heading-secondary inline-block">{name}</h2>
      </div>
      <DropdownMenu
        buttonId="edit-button"
        menuId={"edit-menu"}
        menuItems={["Edit Pot", "Delete Pot"]}
        icon={EllipsisIcon}
        ariaLabel="Open Edit Pot Menu"
        isOpen={isOpen}
        onToggle={() => setIsOpen((prev) => !prev)}
        hasDeleteAction={true}
      />
    </div>
  );
}
