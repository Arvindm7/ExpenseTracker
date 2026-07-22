const BudgetSchema = require("../models/budgetModel");

// Set or update a budget for a category in a specific month
exports.setBudget = async (req, res) => {
    const { category, limit, month, year } = req.body;

    try {
        if (!category || !limit || !month || !year) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (limit <= 0 || isNaN(limit)) {
            return res.status(400).json({ message: 'Limit must be a positive number!' });
        }

        // Upsert: create or update
        const budget = await BudgetSchema.findOneAndUpdate(
            { user: req.user._id, category, month, year },
            { limit },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.status(200).json({ message: 'Budget set successfully', budget });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all budgets for a specific month/year
exports.getBudgets = async (req, res) => {
    const { month, year } = req.query;

    try {
        const query = { user: req.user._id };
        if (month) query.month = parseInt(month);
        if (year) query.year = parseInt(year);

        const budgets = await BudgetSchema.find(query).sort({ category: 1 });
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a budget
exports.deleteBudget = async (req, res) => {
    const { id } = req.params;
    try {
        const budget = await BudgetSchema.findOneAndDelete({ _id: id, user: req.user._id });
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        res.status(200).json({ message: 'Budget deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
