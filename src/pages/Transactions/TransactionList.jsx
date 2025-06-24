import TransactionItem from "../../components/TransactionItem";

export default function TransactionList({ data, listLength = 5 }) {
  return (
    <ul>
      {data.slice(0, listLength).map((transaction) => (
        <TransactionItem key={transaction.name} {...transaction} />
      ))}
    </ul>
  );
}
