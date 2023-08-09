import { DataTypes } from "sequelize";
import DBSETTINGS from "../../config/settings/database.js";

const Rack = DBSETTINGS.define("Rack", {
  rack_sn: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  uuid_user: {
    type: DataTypes.STRING,
  },
  post_interval: {
    type: DataTypes.INTEGER,
  },
  rms_ip: {
    type: DataTypes.STRING,
  },
  inverter_ip: {
    type: DataTypes.STRING,
  },
});

export default Rack;

(async () => {
  // await DBSETTINGS.sync({ alter: true });
  await DBSETTINGS.sync();
  console.log("Rack Table is ready");
})();
