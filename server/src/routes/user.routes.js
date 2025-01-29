import { Router} from "express";
import { userSignup, userLogin, updateUserDetails, getUsers, searchUsers } from "../controllers/user.controllers.js";
import { auth } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/signup").post(userSignup)
router.route("/login").post(userLogin)
router.route("/updateDetails").post(auth, updateUserDetails)
router.route("/u/:username").get(getUsers)
router.route("/bulk").get(searchUsers)


export default router;