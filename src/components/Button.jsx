export default function Button({ onClick, buttonText, buttonStyles = "" }) {
  return (
    <button
      className={`${buttonStyles} rounded-lg border border-transparent px-200 py-200 text-sm font-bold hover:cursor-pointer`}
      type="button"
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}
