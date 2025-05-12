
import express from 'express'
const router = express.Router();
import {getAllGadgets,addGadget,updateGadget,deleteGadget,selfDestruct} from '../controller/gadgetController.js'

router.get("/", getAllGadgets);
router.post("/", addGadget);
router.patch("/:id", updateGadget);
router.delete("/:id", deleteGadget);
router.post("/:id/self-destruct", selfDestruct);

export default router