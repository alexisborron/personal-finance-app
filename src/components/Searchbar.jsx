import SearchIcon from "../assets/images/icon-search.svg";
export default function Searchbar({ searchHandler, value, placeholder }) {
  return (
    <div className="relative flex flex-1 items-center">
      <img
        src={SearchIcon}
        className="absolute right-250 h-[16px] w-[16px]"
        alt="Search Icon"
      />
      <input
        type="search"
        className="border-beige-500 text-beige-500 w-full rounded-lg border-1 px-250 py-150 text-sm"
        onChange={searchHandler}
        value={value}
        placeholder={placeholder}
      ></input>
    </div>
  );
}
