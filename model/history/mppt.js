import { DataTypes } from "sequelize";
import DBHISTORY from "../../config/history/database.js";

/**
 * @description model tabel MPPT di history db
 */

const MPPTHISTORY = DBHISTORY.define("mppt", {
  UUID_User: {
    type: DataTypes.STRING,
  },
  data: {
    type: DataTypes.JSON,
  },
});

export default MPPTHISTORY;

(async () => {
  // await DBHISTORY.sync({ alter: true });
  await DBHISTORY.sync();
  console.log("MPPT Table is ready");
})();
