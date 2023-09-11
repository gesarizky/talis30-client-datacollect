import { DataTypes } from "sequelize";
import DBSETTINGS from "../../config/settings/database.js";
import Rack from "./Rack.js";

/**
 * @description model tabel MPPT di settings database
 */

const MPPT = DBSETTINGS.define("mppt", {
  mppt_sn: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  mppt_ip: {
    type: DataTypes.STRING,
  },
});

Rack.hasMany(MPPT, { as: "mppt", foreignKey: "rack_sn" });
MPPT.belongsTo(Rack, { foreignKey: "rack_sn" });

export default MPPT;

(async () => {
  // await DBSETTINGS.sync({ alter: true });
  await DBSETTINGS.sync();
  console.log("MPPT Table is ready");
})();
