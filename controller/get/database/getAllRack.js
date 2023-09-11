import Rack from "../../../model/settings/Rack.js";

/**
 * @description mengambil semua data dari database Rack
 * @param {*} params query sequelize  
 * @returns hasil query sequelize findAll
 */

const getAllRack = async (params) => {
  try {
    const data = await Rack.findAll(params);
    return data;
  } catch (error) {
    throw ("error getAllRack :", error);
  }
};

export default getAllRack;

