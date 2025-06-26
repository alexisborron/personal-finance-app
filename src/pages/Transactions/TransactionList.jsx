import TransactionItem from "../../components/TransactionItem";

export default function TransactionList({ data, hideLastBorder = false }) {
  return (
    <ul>
      {data.map((transaction, index) => (
        <TransactionItem
          key={transaction.name}
          {...transaction}
          isLastItem={hideLastBorder && index === data.length - 1}
        />
      ))}
    </ul>
  );
}
