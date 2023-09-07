import Interval from "../model/settings/interval.js";
import Rack from "../model/settings/Rack.js";
import RMS1 from "../model/settings/RMS.js";
import Inverter1 from "../model/settings/Inverter.js";
import MPPT from "../model/settings/Mppt.js";
const dataSetting = async (app)=>{
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
      res.json({
        status: 200,
        message: `Data Interval ${requestedDevice} is deleted`,
      });
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
      const response = await Rack.findOne({
        where: { rack_sn: requestedRack },
      });
      res.json({ status: 200, data: response });
    } catch (error) {
      throw ("error index : get/rack1/:rack_sn :", error);
    }
  });

  app.delete("/rack/:rack_sn", async (req, res) => {
    try {
      const requestedRack = req.params.rack_sn;
      await Rack.destroy({ where: { rack_sn: requestedRack } });
      res.json({
        status: 200,
        message: `Data Rack ${requestedRack} is deleted`,
      });
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

  app.get("/rms1/:rms_sn", async (req, res) => {
    try {
      const requestedDevice = req.params.rms_sn;
      const response = await RMS1.findOne({
        where: { rms_sn: requestedDevice },
      });
      res.json({ status: 200, data: response });
    } catch (error) {
      throw ("error index : get/rms1/:rms_sn :", error);
    }
  });

  app.delete("/rms1/:rms_sn", async (req, res) => {
    try {
      const requestedDevice = req.params.rms_sn;
      await RMS1.destroy({ where: { rms_sn: requestedDevice } });
      res.json({
        status: 200,
        message: `Data RMS1 ${requestedDevice} is deleted`,
      });
    } catch (error) {
      throw ("error index : get/rms1/:rms_sn :", error);
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

  app.get("/inverter1/:inverter_sn", async (req, res) => {
    try {
      const requestedDevice = req.params.rms_sn;
      const response = await Inverter1.findOne({
        where: { inverter_sn: requestedDevice },
      });
      res.json({ status: 200, data: response });
    } catch (error) {
      throw ("error index : get/inverter1/:rms_sn :", error);
    }
  });

  app.delete("/inverter1/:inverter_sn", async (req, res) => {
    try {
      const requestedDevice = req.params.inverter_sn;
      await Inverter1.destroy({ where: { inverter_sn: requestedDevice } });
      res.json({
        status: 200,
        message: `Data Inverter1 ${requestedDevice} is deleted`,
      });
    } catch (error) {
      throw ("error index : get/inverter1/:inverter_sn :", error);
    }
  });

  // MPPT1

  app.post("/mppt1", async (req, res) => {
    try {
      await MPPT.upsert(req.body);
      res.json({ status: 200, message: "mppt is inserted" });
    } catch (error) {
      throw ("error index : post/mppt :", error);
    }
  });

  app.get("/mppt1", async (req, res) => {
    try {
      const response = await MPPT.findAll();
      res.json({ status: 200, data: response });
    } catch (error) {
      throw ("error index : get/mppt :", error);
    }
  });

  app.get("/mppt1/:mppt_sn", async (req, res) => {
    try {
      const requestedDevice = req.params.mppt_sn;
      const response = await MPPT.findOne({
        where: { mppt_sn: requestedDevice },
      });
      res.json({ status: 200, data: response });
    } catch (error) {
      throw ("error index : get/mppt/:mppt_sn :", error);
    }
  });

  app.delete("/mppt1/:mppt_sn", async (req, res) => {
    try {
      const requestedDevice = req.params.mppt_sn;
      await MPPT.destroy({ where: { mppt_sn: requestedDevice } });
      res.json({
        status: 200,
        message: `Data MPPT ${requestedDevice} is deleted`,
      });
    } catch (error) {
      throw ("error index : get/mppt/:mppt_sn :", error);
    }
  });
}
export default dataSetting