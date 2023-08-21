import { DataTypes } from "sequelize";
import DBHISTORY from "../../config/history/database.js";

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
