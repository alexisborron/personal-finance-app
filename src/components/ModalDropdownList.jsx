import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";

export default function ModalDropdownList({
  items = [],
  ariaLabelledby,
  className,
}) {
  const isTheme = typeof items[0] === "object" && "colorClass" in items[0];
  const [selectedItem, setSelectedItem] = useState(items[0] || null);

  return (
    <Listbox value={selectedItem} onChange={setSelectedItem}>
      <div className="relative w-full">
        <ListboxButton
          aria-labelledby={ariaLabelledby}
          className="border-beige-500 text-grey-900 focus:outline-grey-900 block w-full min-w-0 cursor-pointer rounded-lg border px-4 py-150 text-left text-sm focus:outline"
        >
          {isTheme ? (
            <div className="flex items-center gap-150">
              <div
                className={`h-200 w-200 rounded-full ${selectedItem?.colorClass}`}
              ></div>
              {selectedItem?.colorName}
            </div>
          ) : (
            selectedItem
          )}
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          className={`shadow-3xl z-50 w-[var(--button-width)] rounded-lg bg-white ${className}`}
        >
          <div className="max-h-[295px] overflow-y-auto">
            {items.map((item) => (
              <ListboxOption
                key={isTheme ? item.id : item}
                value={item}
                className="text-grey-900 border-grey-100 mx-250 cursor-pointer border-b py-150 text-left text-sm select-none data-[focus]:font-bold"
              >
                {isTheme ? (
                  <div className="flex items-center gap-150">
                    <div
                      className={`mr-200 inline-block h-200 w-200 rounded-full ${item.colorClass}`}
                    ></div>
                    {item.colorName}
                  </div>
                ) : (
                  item
                )}
              </ListboxOption>
            ))}
          </div>
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
