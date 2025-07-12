export function formatCurrency(amount) {
    return `$${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatCurrencyNoCents(amount) {
    return `$${Math.abs(amount).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
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

export function getOrdinalSuffix(n) {
    if (n % 100 >= 11 && n % 100 <= 13) {
        return "th";
    }
    switch (n % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

