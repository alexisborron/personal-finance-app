import TransactionItem from "./TransactionItem";

export default function TransactionList({ data }) {
  return (
    <ul>
      {data.map((transaction, index) => (
        <li
          key={`${transaction.name}-${index}`}
          className="border-grey-100 border-b py-200 last:border-b-0 last:pb-0"
        >
          <TransactionItem {...transaction} />
        </li>
      ))}
    </ul>
  );
}
