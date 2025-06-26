export default function PaginationButton({ icon }) {
  return (
    <div className="border-beige-500 flex h-[40px] w-[48px] items-center justify-center rounded-lg border">
      <img src={icon} alt="Next" className="w-[6px]" />
    </div>
  );
}
