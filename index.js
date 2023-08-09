import express from "express";
import dotenv from "dotenv";
import Rack from "./model/settings/Rack.js";
import getAllRack from "./controller/get/database/getAllRack.js";
import mainRms from "./controller/get/mainRms.js";
import mainInverter from "./controller/get/mainInverter.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", async (req, res) => {
  res.json({ status: true, message: "Our node.js app works" });
});

app.post("/rack", async (req, res) => {
  try {
    await Rack.create(req.body);
    res.json({ status: true, message: "Rack is inserted" });
  } catch (error) {
    throw ("error index : post/rack :", error);
  }
});

app.get("/rack", async (req, res) => {
  try {
    const response = await getAllRack();
    res.json({ status: 200, data: response });
  } catch (error) {
    throw ("error index : post/rack :", error);
  }
});

app.get("/rms", async (req, res) => {
  try {
    const response = await mainRms();
    res.json({ status: 200, data: response });
  } catch (error) {
    throw ("error index : post/rack :", error);
  }
});

app.get("/inverter", async (req, res) => {
  try {
    const response = await mainInverter();
    res.json({ status: 200, data: response });
  } catch (error) {
    throw ("error index : post/rack :", error);
  }
});

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
