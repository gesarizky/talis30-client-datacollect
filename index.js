import express from "express";
import dotenv from "dotenv";
import Interval from "./model/settings/interval.js";
import Rack from "./model/settings/Rack.js";
import RMS1 from "./model/settings/RMS.js";
import Inverter1 from "./model/settings/Inverter.js";
import mainRms from "./controller/get/mainRms.js";
import mainInverter from "./controller/get/mainInverter.js";
import mainControl from "./controller/mainControl.js";
import getLocalRMS from "./controller/get/database/getLocalRms.js";
import getLocalInverter from "./controller/get/database/getLocalInverter.js";
var taskRMS;
var taskInverter;

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(express.json());
[taskRMS, taskInverter] = await mainControl();
taskRMS.start();
taskInverter.start();

app.get("/", async (req, res) => {
  res.json({ status: 200, message: "Our node.js app works" });
});

// INTERVAL

app.post("/interval", async (req, res) => {
  try {
    await Interval.upsert(req.body);
    res.json({ status: 200, message: "Interval is inserted" });
  } catch (error) {
    throw ("error index : post/interval :", error);
  }
});

app.get("/interval", async (req, res) => {
  try {
    const response = await Interval.findAll();
    res.json({ status: 200, data: response });
  } catch (error) {
    throw ("error index : get/interval :", error);
  }
});

app.get("/interval/:device", async (req, res) => {
  try {
    const requestedDevice = req.params.device;
    const response = await Interval.findOne({
      where: { device: requestedDevice },
    });
    res.json({ status: 200, data: response });
  } catch (error) {
    throw ("error index : get/interval/:device :", error);
  }
});

app.delete("/interval/:device", async (req, res) => {
  try {
    const requestedDevice = req.params.device;
    await Interval.destroy({
      where: { device: requestedDevice },
    });
    res.json({ status: 200, message: `Data Interval ${requestedDevice} is deleted` });
  } catch (error) {
    throw ("error index : get/interval/:device :", error);
  }
});


// RACK

app.post("/rack", async (req, res) => {
  try {
    await Rack.upsert(req.body);
    res.json({ status: 200, message: "Rack is inserted" });
  } catch (error) {
    throw ("error index : post/rack :", error);
  }
});

app.get("/rack", async (req, res) => {
  try {
    const response = await Rack.findAll();
    res.json({ status: 200, data: response });
  } catch (error) {
    throw ("error index : get/rack1 :", error);
  }
});

app.get("/rack/:rack_sn", async (req, res) => {
  try {
    const requestedRack = req.params.rack_sn;
    const response = await Rack.findOne({ where: { rack_sn: requestedRack } });
    res.json({ status: 200, data: response });
  } catch (error) {
    throw ("error index : get/rack1/:rack_sn :", error);
  }
});

app.delete("/rack/:rack_sn", async (req, res) => {
  try {
    const requestedRack = req.params.rack_sn;
    await Rack.destroy({ where: { rack_sn: requestedRack } });
    res.json({ status: 200, message: `Data Rack ${requestedRack} is deleted` });
  } catch (error) {
    throw ("error index : get/rack1/:rack_sn :", error);
  }
});

// RMS1

app.post("/rms1", async (req, res) => {
  try {
    await RMS1.upsert(req.body);
    res.json({ status: 200, message: "RMS1 is inserted" });
  } catch (error) {
    throw ("error index : post/rms1 :", error);
  }
});

app.get("/rms1", async (req, res) => {
  try {
    const response = await RMS1.findAll();
    res.json({ status: 200, data: response });
  } catch (error) {
    throw ("error index : get/rms1 :", error);
  }
});

app.get("/rms1/:device_sn", async (req, res) => {
  try {
    const requestedDevice = req.params.device_sn;
    const response = await RMS1.findOne({
      where: { device_sn: requestedDevice },
    });
    res.json({ status: 200, data: response });
  } catch (error) {
    throw ("error index : get/rms1/:device_sn :", error);
  }
});

app.delete("/rms1/:device_sn", async (req, res) => {
  try {
    const requestedDevice = req.params.device_sn;
    await RMS1.destroy({ where: { device_sn: requestedDevice } });
    res.json({
      status: 200,
      message: `Data RMS1 ${requestedDevice} is deleted`,
    });
  } catch (error) {
    throw ("error index : get/rms1/:device_sn :", error);
  }
});


// RMS1

app.post("/rms1", async (req, res) => {
  try {
    await RMS1.upsert(req.body);
    res.json({ status: 200, message: "RMS1 is inserted" });
  } catch (error) {
    throw ("error index : post/rms1 :", error);
  }
});

app.get("/rms1", async (req, res) => {
  try {
    const response = await RMS1.findAll();
    res.json({ status: 200, data: response });
  } catch (error) {
    throw ("error index : get/rms1 :", error);
  }
});

app.get("/rms1/:device_sn", async (req, res) => {
  try {
    const requestedDevice = req.params.device_sn;
    const response = await RMS1.findOne({
      where: { device_sn: requestedDevice },
    });
    res.json({ status: 200, data: response });
  } catch (error) {
    throw ("error index : get/rms1/:device_sn :", error);
  }
});

app.delete("/rms1/:device_sn", async (req, res) => {
  try {
    const requestedDevice = req.params.device_sn;
    await RMS1.destroy({ where: { device_sn: requestedDevice } });
    res.json({
      status: 200,
      message: `Data RMS1 ${requestedDevice} is deleted`,
    });
  } catch (error) {
    throw ("error index : get/rms1/:device_sn :", error);
  }
});

// Inverter1

app.post("/inverter1", async (req, res) => {
  try {
    await Inverter1.upsert(req.body);
    res.json({ status: 200, message: "Inverter1 is inserted" });
  } catch (error) {
    throw ("error index : post/inverter1 :", error);
  }
});

app.get("/inverter1", async (req, res) => {
  try {
    const response = await Inverter1.findAll();
    res.json({ status: 200, data: response });
  } catch (error) {
    throw ("error index : get/inverter1 :", error);
  }
});

app.get("/inverter1/:device_sn", async (req, res) => {
  try {
    const requestedDevice = req.params.device_sn;
    const response = await Inverter1.findOne({
      where: { device_sn: requestedDevice },
    });
    res.json({ status: 200, data: response });
  } catch (error) {
    throw ("error index : get/inverter1/:device_sn :", error);
  }
});

app.delete("/inverter1/:device_sn", async (req, res) => {
  try {
    const requestedDevice = req.params.device_sn;
    await Inverter1.destroy({ where: { device_sn: requestedDevice } });
    res.json({
      status: 200,
      message: `Data Inverter1 ${requestedDevice} is deleted`,
    });
  } catch (error) {
    throw ("error index : get/inverter1/:device_sn :", error);
  }
});

// FETCHING DATA

app.get("/rms", async (req, res) => {
  try {
    const response = await mainRms();
    res.json({ status: 200, data: response });
  } catch (error) {
    throw ("error index : get/rms :", error);
  }
});

app.get("/inverter", async (req, res) => {
  try {
    const response = await mainInverter();
    res.json({ status: 200, data: response });
  } catch (error) {
    throw ("error index : get/inverter :", error);
  }
});

// CONTROLL

app.post("/start", async (req, res) => {
  try {
    taskRMS.start();
    taskInverter.start();
    res.json({ status: 200, message: "post started" });
  } catch (error) {
    throw ("error index : post/start :", error);
  }
});

app.post("/stop", async (req, res) => {
  try {
    taskRMS.stop();
    taskInverter.stop();
    res.json({ status: 200, message: "post stoped" });
  } catch (error) {
    throw ("error index : post/stop :", error);
  }
});



// DATABASE LOCAL

app.get("/database/rms", async (req, res) => {
  try {
    const response = await getLocalRMS();
    res.json({ status: 200, data: response });
  } catch (error) {
    throw ("error index : get/database/rms :", error);
  }
});

app.get("/database/inverter", async (req, res) => {
  try {
    const response = await getLocalInverter();
    res.json({ status: 200, data: response });
  } catch (error) {
    throw ("error index : get/database/inverter :", error);
  }
});

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
