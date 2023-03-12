import express from "express";

/* Controllers imports */
import {
  createRound,
  readRound,
  readRounds,
  updateRound,
} from "../controllers/rounds.controller";

const router = express.Router();

/* -------------------------------------------------- Rounds management -------------------------------------------------- */

/* Creates a round */
router.post("/rounds", createRound);

/* Reads a round */
router.get("/rounds", readRound);

/* Updates a round */
router.patch("/rounds", updateRound);

/* Reads all rounds */
router.get("/rounds/all", readRounds);

export default router;
