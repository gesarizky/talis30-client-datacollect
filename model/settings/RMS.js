import { DataTypes } from "sequelize";
import DBSETTINGS from "../../config/settings/database.js";
import Rack from "./Rack.js";

const RMS1 = DBSETTINGS.define("rms", {
  device_sn: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  rms_ip: {
    type: DataTypes.STRING,
  },
});

Rack.hasMany(RMS1, { as: "rms", foreignKey: "rack_sn" });
RMS1.belongsTo(Rack, { foreignKey: "rack_sn" });

export default RMS1;

(async () => {
  // await DBSETTINGS.sync({ alter: true });
  await DBSETTINGS.sync();
  console.log("RMS1 Table is ready");
})();
