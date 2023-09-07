import dataHistory from "./history.js";
import dataSetting from "./settings.js";
import dataFetching from "./fetching.js";

export default (app) => {
  app.get("/", async (req, res) => {
    res.json({ status: 200, message: "Our node.js app works" });
  });

  dataHistory(app);
  dataSetting(app);
  dataFetching(app);
};
