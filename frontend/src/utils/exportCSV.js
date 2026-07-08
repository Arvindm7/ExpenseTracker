import { dateFormat } from './dateFormat';

/**
 * Export transactions to CSV file and trigger download.
 * Runs entirely client-side — no backend needed.
 * 
 * @param {Array} transactions - Array of transaction objects
 * @param {string} filename - Name for the downloaded file
 */
export const exportToCSV = (transactions, filename = 'transactions') => {
    if (!transactions || transactions.length === 0) {
        return false;
    }

    // CSV Headers
    const headers = ['Date', 'Title', 'Category', 'Type', 'Amount (₹)', 'Description'];

    // Build CSV rows
    const rows = transactions.map(item => {
        const amount = item.type === 'expense' ? -item.amount : item.amount;
        return [
            dateFormat(item.date),
            escapeCSV(item.title),
            escapeCSV(item.category),
            item.type.charAt(0).toUpperCase() + item.type.slice(1),
            amount,
            escapeCSV(item.description || ''),
        ].join(',');
    });

    // Calculate totals
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    // Add summary rows
    rows.push('');
    rows.push(`Summary,,,,`);
    rows.push(`Total Income,,,,${totalIncome},`);
    rows.push(`Total Expenses,,,,-${totalExpense},`);
    rows.push(`Net Balance,,,,${totalIncome - totalExpense},`);

    // Combine headers and rows
    const csvContent = [headers.join(','), ...rows].join('\n');

    // Create blob and trigger download
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    // Generate filename with date
    const today = new Date().toISOString().split('T')[0];
    link.href = url;
    link.download = `${filename}_${today}.csv`;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return true;
};

/**
 * Escape special characters for CSV format
 */
function escapeCSV(value) {
    if (typeof value !== 'string') return value;
    // If value contains commas, quotes, or newlines, wrap in quotes
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
}
