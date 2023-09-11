import { DataTypes } from "sequelize";
import DBSETTINGS from "../../config/settings/database.js";
import Rack from "./Rack.js";

/**
 * @description model tabel Inverter di settings database
 */

const Inverter1 = DBSETTINGS.define("inverter", {
  inverter_sn: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  inverter_ip: {
    type: DataTypes.STRING,
  },
});

Rack.hasMany(Inverter1, { as: "inverter", foreignKey: "rack_sn" });
Inverter1.belongsTo(Rack, { foreignKey: "rack_sn" });

export default Inverter1;

(async () => {
  // await DBSETTINGS.sync({ alter: true });
  await DBSETTINGS.sync();
  console.log("Inverter1 Table is ready");
})();
