import { useState } from "react";
import InputField from "../../components/InputField";
import ModalDropdownList from "../../components/ModalDropdownList";

export default function PotModalContent({ themeItems }) {
  const [potName, setPotName] = useState("");
  const [potTarget, setPotTarget] = useState("");
  return (
    <>
      <div>
        <label
          htmlFor="pot-name"
          className="text-grey-500 block pb-[6px] text-xs font-bold"
        >
          Pot Name
        </label>
        <InputField
          type="text"
          id="pot-name"
          onChange={(e) => setPotName(e.target.value)}
          value={potName}
          placeholder=""
        />
      </div>
      <div>
        <label
          htmlFor="max-spend"
          className="text-grey-500 block pb-[6px] text-xs font-bold"
        >
          Target
        </label>
        <InputField
          type="number"
          id="max-spend"
          onChange={(e) => setPotTarget(e.target.value)}
          value={potTarget}
          placeholder="e.g. 2000"
        >
          <span className="text-beige-500 absolute left-200">$</span>
        </InputField>
      </div>
      <div>
        <p
          id="theme-label"
          className="text-grey-500 block pb-[6px] text-xs font-bold"
        >
          Theme
        </p>
        <ModalDropdownList
          items={themeItems}
          ariaLabelledby="theme-label"
          className={"mt-[12px]"}
        />
      </div>
    </>
  );
}
