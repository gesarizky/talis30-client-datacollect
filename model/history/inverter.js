import { DataTypes } from "sequelize";
import DBHISTORY from "../../config/history/database.js";

/**
 * @description model tabel inverter di history db
 */

const Inverter = DBHISTORY.define("inverter", {
  UUID_User: {
    type: DataTypes.STRING,
  },
  data: {
    type: DataTypes.JSON,
  },
});

export default Inverter;

(async () => {
  // await DBHISTORY.sync({ alter: true });
  await DBHISTORY.sync();
  console.log("Inverter Table is ready");
})();
