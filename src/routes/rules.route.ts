import express from "express";

/* Controllers imports */
import {
  createRule,
  readRule,
  updateRule,
  deleteRule,
  readRules,
} from "../controllers/rules.controller";

const router = express.Router();

/* -------------------------------------------------- Rules management -------------------------------------------------- */

/* Creates a rule */
router.post("/rules", createRule);

/* Reads a rule */
router.get("/rules", readRule);

/* Updates a rule */
router.patch("/rules", updateRule);

/* Deletes a rule */
router.delete("/rules", deleteRule);

/* Reads all rules */
router.get("/rules/all", readRules);

export default router;
