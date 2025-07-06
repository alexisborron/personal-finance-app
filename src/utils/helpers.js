export function getTotal(arr, key) { return arr.reduce((sum, item) => sum + item[key], 0) };

export function calculateBudgetSpentAndRemaining(budget, transactions) {
    const filteredTransactions = transactions.filter(
        (t) => t.category === budget.category,
    );

    const totalSpent = filteredTransactions.reduce(
        (acc, t) => acc + Math.abs(t.amount),
        0,
    );

    const remaining = budget.maximum - totalSpent;

    return { totalSpent, remaining };
}