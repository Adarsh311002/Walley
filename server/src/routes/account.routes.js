import { Router } from "express";
import { getBalance } from "../controllers/account.controllers.js";
import { auth } from "../middlewares/auth.middlewares.js";


const router = Router();

router.route("/balance").get(auth ,getBalance)

export default router