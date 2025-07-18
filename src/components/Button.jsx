export default function Button({
  type,
  onClick,
  buttonText,
  buttonStyles = "",
}) {
  return (
    <button
      type={type}
      className={`${buttonStyles} rounded-lg border border-transparent px-200 py-200 text-sm font-bold hover:cursor-pointer`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}
