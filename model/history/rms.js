import { DataTypes } from "sequelize";
import DBHISTORY from "../../config/history/database.js";

/**
 * @description model tabel RMS di history db
 */

const RMS = DBHISTORY.define("rms", {
  UUID_User: {
    type: DataTypes.STRING,
  },
  data: {
    type: DataTypes.JSON,
  },
});

export default RMS;

(async () => {
  // await DBHISTORY.sync({ alter: true });
  await DBHISTORY.sync();
  console.log("RMS Table is ready");
})();
