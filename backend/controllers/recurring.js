const IncomeSchema = require("../models/incomeModel");
const ExpenseSchema = require("../models/expenseModel");

// Process recurring transactions for the current month
// Creates new entries from last month's recurring transactions if they don't already exist this month
exports.processRecurring = async (req, res) => {
    try {
        const userId = req.user._id;
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // Start/end of current month
        const monthStart = new Date(currentYear, currentMonth, 1);
        const monthEnd = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59);

        let created = 0;

        // Process recurring incomes
        const recurringIncomes = await IncomeSchema.find({
            user: userId,
            isRecurring: true
        });

        for (const income of recurringIncomes) {
            // Check if already exists this month (same title, category, amount, user)
            const existing = await IncomeSchema.findOne({
                user: userId,
                title: income.title,
                category: income.category,
                amount: income.amount,
                date: { $gte: monthStart, $lte: monthEnd }
            });

            if (!existing) {
                // Create new entry for this month
                const newDate = new Date(currentYear, currentMonth, new Date(income.date).getDate());
                // Clamp day to last day of month if needed
                if (newDate.getMonth() !== currentMonth) {
                    newDate.setDate(0); // last day of target month
                }

                await IncomeSchema.create({
                    user: userId,
                    title: income.title,
                    amount: income.amount,
                    type: income.type,
                    date: newDate,
                    category: income.category,
                    description: income.description,
                    isRecurring: true
                });
                created++;
            }
        }

        // Process recurring expenses
        const recurringExpenses = await ExpenseSchema.find({
            user: userId,
            isRecurring: true
        });

        for (const expense of recurringExpenses) {
            const existing = await ExpenseSchema.findOne({
                user: userId,
                title: expense.title,
                category: expense.category,
                amount: expense.amount,
                date: { $gte: monthStart, $lte: monthEnd }
            });

            if (!existing) {
                const newDate = new Date(currentYear, currentMonth, new Date(expense.date).getDate());
                if (newDate.getMonth() !== currentMonth) {
                    newDate.setDate(0);
                }

                await ExpenseSchema.create({
                    user: userId,
                    title: expense.title,
                    amount: expense.amount,
                    type: expense.type,
                    date: newDate,
                    category: expense.category,
                    description: expense.description,
                    isRecurring: true
                });
                created++;
            }
        }

        res.status(200).json({
            message: created > 0
                ? `${created} recurring transaction(s) added for this month`
                : 'All recurring transactions are up to date',
            created
        });
    } catch (error) {
        console.error('Process recurring error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
