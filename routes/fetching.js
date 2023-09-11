import mainRms from "../controller/get/mainRms.js";
import mainInverter from "../controller/get/mainInverter.js";
import mainMppt from "../controller/get/mainMppt.js";

/**
 * @description routing untuk fetching data
 * @param {*} app 
 */

const dataFetching = async (app) => {
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

  app.get("/mppt", async (req, res) => {
    try {
      const response = await mainMppt();
      res.json({ status: 200, data: response });
    } catch (error) {
      throw ("error index : get/mppt :", error);
    }
  });
};
export default dataFetching;
