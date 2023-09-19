import Rack from "../../../model/settings/Rack.js";
import RMS1 from "../../../model/settings/RMS.js";

/**
 * @description mengambil satu data dari tabel database RMS
 * @param {*} params query sequelize
 * @returns hasil query sequelize findOne
 */

const getOneRms = async (params) => {
  try {
    const data = await RMS1.findOne(params);
    return data;
  } catch (error) {
    throw ("error getAllRack :", error);
  }
};

export default getOneRms;
