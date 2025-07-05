import { Link } from "react-router-dom";
export default function OverviewCardHeader({
  title,
  linkText,
  srText,
  icon,
  path,
}) {
  return (
    <div className="mb-250 flex items-center justify-between">
      <h2 className="text-heading-secondary">{title}</h2>
      <Link className="text-label flex items-center text-gray-500" to={path}>
        {linkText}
        <span className="sr-only">{srText}</span>
        <img className="ml-150 inline w-[4.5px]" src={icon} alt="" />
      </Link>
    </div>
  );
}
