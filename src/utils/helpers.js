export function getTotal(arr, key) { return arr.reduce((sum, item) => sum + item[key], 0) };

/* useTransactionSearch HOOK */
export function applyFilters(transactions, searchText, selectedCategory, sortOption) {
    let filtered = transactions;

    if (selectedCategory !== "All Transactions") {
        filtered = filtered.filter((t) => t.category === selectedCategory);
    }

    const search = searchText.trim().toLowerCase();
    if (search !== "") {
        filtered = filtered.filter(
            (transaction) =>
                transaction.name.toLowerCase().includes(search) ||
                transaction.category.toLowerCase().includes(search),
        );
    }

    switch (sortOption) {
        case "Latest":
            filtered = [...filtered].sort((a, b) => b.date.localeCompare(a.date));
            break;
        case "Oldest":
            filtered = [...filtered].sort((a, b) => a.date.localeCompare(b.date));
            break;
        case "A to Z":
            filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "Z to A":
            filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
            break;
        case "Highest":
            filtered = [...filtered].sort((a, b) => b.amount - a.amount);
            break;
        case "Lowest":
            filtered = [...filtered].sort((a, b) => a.amount - b.amount);
            break;
        case "Due Date (Earliest First)":
            filtered = [...filtered].sort((a, b) => {
                const dayA = new Date(a.date).getUTCDate();
                const dayB = new Date(b.date).getUTCDate();
                return dayA - dayB;
            });
            break;
        case "Due Date (Latest First)":
            filtered = [...filtered].sort((a, b) => {
                const dayA = new Date(a.date).getUTCDate();
                const dayB = new Date(b.date).getUTCDate();
                return dayB - dayA;
            });
            break;
        default:
            break;
    }
    return filtered;
}

/* BUDGETS PAGE */
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


/* BILLS PAGE */
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

export function getCurrentMonthBillDate(currentDate, originalBillDate) {
    const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        originalBillDate.getDate(),
    );
    date.setHours(0, 0, 0, 0);
    return date;
}

// Calculate the number of days between today and this month's billing date
export function getDaysDifference(currentDate, currentMonthBillDate) {
    const timeDifference =
        currentMonthBillDate.getTime() - currentDate.getTime();
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}

export function getBillStatus(currentDate, currentMonthBillDate, daysDifference) {
    if (currentDate > currentMonthBillDate) {
        return "paid";
    }
    if (daysDifference >= 0 && daysDifference <= 7) {
        return "dueSoon";
    }
    return "upcoming";
}

