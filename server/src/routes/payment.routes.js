import { Router } from "express";
import { auth } from "../middlewares/auth.middlewares.js";
import {createOrder, verifyPayment} from "../controllers/payment.controllers.js"
import { idempotency } from "../middlewares/idempotency.js";

const router = Router();

router.route("/create-order").post(auth,idempotency , createOrder);
router.route("/verify").post(auth,idempotency, verifyPayment);

export default router;