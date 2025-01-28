import { Router } from "express";
import { getBalance, transferMoney } from "../controllers/account.controllers.js";
import { auth } from "../middlewares/auth.middlewares.js";


const router = Router();

router.route("/balance").get(auth ,getBalance)
router.route("/transfer").post(auth , transferMoney)

export default router