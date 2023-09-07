import getLocalInverter from "../controller/get/database/getLocalInverter.js";
import getLocalMPPT from "../controller/get/database/getLocalMPPT.js";
import getLocalRMS from "../controller/get/database/getLocalRms.js";
const dataHistory = async (app) => {
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

  app.get("/database/mppt", async (req, res) => {
    try {
      const response = await getLocalMPPT();
      res.json({ status: 200, data: response });
    } catch (error) {
      throw ("error index : get/database/inverter :", error);
    }
  });
};
export default dataHistory;
