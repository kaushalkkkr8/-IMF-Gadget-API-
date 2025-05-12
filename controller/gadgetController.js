import Gadget from "../model/gadgetModel.js";
import {generateCodename, statusGenerate} from "../utils/codenameGenerator.js";
import missionProbability from "../utils/missionProbability.js";

export const getAllGadgets = async (req, res) => {
  try {
    const { status } = req.query;
    const whereClause = status ? { status } : {};
    const gadgets = await Gadget.findAll({ where: whereClause });

    const result = gadgets.map((gadget) => ({
      ...gadget.toJSON(),
      missionProbability: missionProbability(),
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch gadgets" });
  }
};

export const addGadget = async (req, res) => {
  try {
    const codename = generateCodename();
    const status= statusGenerate()
    const gadget = await Gadget.create({ name: codename,status });
   
    res.status(201).json(gadget);
  } catch (error) {
    res.status(500).json({ error: "Failed to create gadget" });
  }
};

export const updateGadget = async (req, res) => {
  try {
    const gadget = await Gadget.findByPk(req.params.id);
    if (!gadget) return res.status(404).json({ error: "Gadget not found" });

    await gadget.update(req.body);
    res.json(gadget);
  } catch (error) {
    res.status(500).json({ error: "Failed to update gadget" });
  }
};

export const deleteGadget = async (req, res) => {
  try {
    const gadget = await Gadget.findByPk(req.params.id);
    if (!gadget) return res.status(404).json({ error: "Gadget not found" });

    gadget.status = "Decommissioned";
    gadget.decommissionedAt = new Date();
    await gadget.save();

    res.json({ message: "Gadget decommissioned",gadget });
  } catch (error) {
    res.status(500).json({ error: "Failed to decommission gadget" });
  }
};

export const selfDestruct = async (req, res) => {
  try {
    const gadget = await Gadget.findByPk(req.params.id);
    if (!gadget) return res.status(404).json({ error: "Gadget not found" });

    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    gadget.status = "Destroyed";
    gadget.decommissionedAt = new Date();
    await gadget.save();

    res.json({ message: "Self-destruct initiated", confirmationCode });
  } catch (error) {
    res.status(500).json({ error: "Failed to initiate self-destruct" });
  }
};