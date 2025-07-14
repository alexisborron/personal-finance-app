import { useState } from "react";
import InputField from "../../components/InputField";
import ModalDropdownList from "../../components/ModalDropdownList";

export default function BudgetModalContent({ categoryItems, themeItems }) {
  const [maxSpend, setMaxSpend] = useState("");
  return (
    <>
      <div>
        <p
          id="category-label"
          className="text-grey-500 block pb-[6px] text-xs font-bold"
        >
          Budget Category
        </p>
        <ModalDropdownList
          items={categoryItems}
          ariaLabelledby="category-label"
          className={"mt-[12px]"}
        />
      </div>
      <div>
        <label
          htmlFor="max-spend"
          className="text-grey-500 block pb-[6px] text-xs font-bold"
        >
          Maximum Spending
        </label>
        <InputField
          type="number"
          id="max-spend"
          onChange={(e) => setMaxSpend(e.target.value)}
          value={maxSpend}
          placeholder="e.g. 2000"
        >
          <span className="text-beige-500 absolute left-200">$</span>
        </InputField>
      </div>
      <div>
        <p
          id="color-tag-label"
          className="text-grey-500 block pb-[6px] text-xs font-bold"
        >
          Color Tag
        </p>
        <ModalDropdownList
          items={themeItems}
          ariaLabelledby="color-tag-label"
          className={"mt-[12px]"}
        />
      </div>
    </>
  );
}
