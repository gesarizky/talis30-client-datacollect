import { DataTypes } from "sequelize";
import DBSETTINGS from "../../config/settings/database.js";

const Interval = DBSETTINGS.define("Interval", {
  device: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  post_interval: {
    type: DataTypes.INTEGER,
  },
});

export default Interval;

(async () => {
  // await DBSETTINGS.sync({ alter: true });
  await DBSETTINGS.sync();
  console.log("Interval Table is ready");
})();
