import Interval from "../../../model/settings/interval.js";

/**
 * @description mengambil satu data sesuai query sequelize dari database interval
 * @param {*} params query sequelize 
 * @returns hasil query sequelize findOne
 */
const getInterval = async (params) => {
  try {
    const data = await Interval.findOne(params);
    return data;
  } catch (error) {
    throw ("error getInterval :", error);
  }
};

export default getInterval;
