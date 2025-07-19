import SearchIcon from "../assets/images/icon-search.svg";
export default function InputField({
  name,
  type,
  id,
  placeholder,
  value,
  children = null,
  required,
}) {
  return (
    <div className="relative flex flex-1 items-center">
      {type === "search" && (
        <img
          src={SearchIcon}
          className="absolute right-250 h-[16px] w-[16px]"
          alt="Search Icon"
        />
      )}
      {children}
      <input
        name={name}
        type={type}
        id={id}
        className={`border-beige-500 text-beige-500 placeholder-beige-500 w-full rounded-lg border-1 ${type === "number" ? "pl-500" : "pl-250"} py-150 pr-250 text-sm`}
        placeholder={placeholder}
        value={value}
        required={required}
      ></input>
    </div>
  );
}
