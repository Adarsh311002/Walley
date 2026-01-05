import { Router } from "express";
import { getBalance, getTransactions, transferMoney } from "../controllers/account.controllers.js";
import { idempotency } from "../middlewares/idempotency.js";
import { auth } from "../middlewares/auth.middlewares.js";


const router = Router();

router.route("/balance").get(auth ,getBalance)
router.route("/transfer").post(auth ,idempotency, transferMoney)
router.route("/history").get( auth , getTransactions);

export default router