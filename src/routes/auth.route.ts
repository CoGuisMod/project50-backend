import express from "express";

/* Controllers imports */
import { signup, signin, getUsers } from "../controllers/auth.controller";

const router = express.Router();

/* -------------------------------------------------- User auth -------------------------------------------------- */

/* Register an user */
router.post("/signup", signup);

/* Login an user */
router.post("/signin", signin);

router.get("/users", getUsers);

export default router;
