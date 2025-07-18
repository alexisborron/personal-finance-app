import InputField from "../../components/InputField";
import ModalDropdownList from "../../components/ModalDropdownList";

export default function BudgetModalContent({ categoryItems, themeItems }) {
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
          name="category"
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
          name="maxSpend"
          type="number"
          id="max-spend"
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
          name="theme"
          items={themeItems}
          ariaLabelledby="color-tag-label"
          className={"mt-[12px]"}
        />
      </div>
    </>
  );
}
