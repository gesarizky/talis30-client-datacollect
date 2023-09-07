import dataHistory from "./history.js";
import dataSetting from "./settings.js";
import dataFetching from "./fetching.js";
import mainRms from "../controller/get/mainRms.js";
import mainInverter from "../controller/get/mainInverter.js";
import mainMppt from "../controller/get/mainMppt.js";

export default (app) => {
  app.get("/", async (req, res) => {
    res.json({ status: 200, message: "Our node.js app works" });
  });

  dataHistory(app);
  dataSetting(app);
  dataFetching(app);
};
