import { Router } from "express";
import { audioFunction } from "../controllers/textconvertor.controller.js";
import { test } from "../controllers/test.controller.js";

const textconvertorRouter = Router();

textconvertorRouter.route("/textconvertor").post(audioFunction);
textconvertorRouter.route("/test").post(test);

export default textconvertorRouter;
