import TransactionItem from "../../components/TransactionItem";

export default function TransactionList({ data }) {
  return (
    <ul>
      {data.map((transaction) => (
        <TransactionItem key={transaction.name} {...transaction} />
      ))}
    </ul>
  );
}
