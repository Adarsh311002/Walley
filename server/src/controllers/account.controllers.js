import {Account} from "../models/account.models.js"


const getBalance = async (req, res) => {
    try {
        // First check if userId exists in request
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User ID not found"
            });
        }

        const account = await Account.findOne({
            userId: req.userId
        });

        // Check if account exists
        if (!account) {
            return res.status(404).json({
                success: false,
                message: "Account not found for this user"
            });
        }

        // If account exists, send the balance
        return res.status(200).json({
            success: true,
            balance: account.Balance
        });

    } catch (error) {
        console.error("Error fetching balance:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching balance",
            error: error.message
        });
    }
};


export { getBalance}