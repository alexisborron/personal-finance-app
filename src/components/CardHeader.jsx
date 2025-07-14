import { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import EllipsisIcon from "../assets/images/icon-ellipsis.svg";

export default function CardHeader({
  headingText,
  theme = false,
  menuItems = [],
  ariaLabelText = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-250 flex items-center justify-between">
      <div>
        {theme && (
          <div
            className={`${theme} mr-200 inline-block h-200 w-200 rounded-full`}
          ></div>
        )}
        <h2 className="text-heading-secondary inline-block">{headingText}</h2>
      </div>
      {menuItems && (
        <DropdownMenu
          buttonId="edit-button"
          menuId={"edit-menu"}
          menuItems={menuItems}
          icon={EllipsisIcon}
          ariaLabel={ariaLabelText}
          isOpen={isOpen}
          onToggle={() => setIsOpen((prev) => !prev)}
          hasDeleteAction={true}
        />
      )}
    </div>
  );
}
