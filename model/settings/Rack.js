import { DataTypes } from "sequelize";
import DBSETTINGS from "../../config/settings/database.js";

/**
 * @description model tabel Rack di settings database
 */

const Rack = DBSETTINGS.define("Rack", {
  rack_sn: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  uuid_user: {
    type: DataTypes.STRING,
  },
});

export default Rack;

(async () => {
  // await DBSETTINGS.sync({ alter: true });
  await DBSETTINGS.sync();
  console.log("Racks Table is ready");
})();
