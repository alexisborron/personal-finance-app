export function formatCurrency(amount) {
    return `$${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatTransaction(amount) {
    const symbol = amount < 0 ? '-' : '+';
    return `${symbol}${formatCurrency(amount)}`;
}

export function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}
