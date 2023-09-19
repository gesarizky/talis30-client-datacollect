import Rack from "../../../model/settings/Rack.js";
import RMS1 from "../../../model/settings/RMS.js";

/**
 * @description mengambil semua data dari database Rack
 * @param {*} params query sequelize
 * @returns hasil query sequelize findAll
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
