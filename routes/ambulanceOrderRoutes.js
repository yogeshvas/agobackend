import express from "express";

import { bookAmbulance } from "../controllers/ambulance.js";

const router = express.Router();

router.route("/ambulance-order").post(bookAmbulance);

export default router;
