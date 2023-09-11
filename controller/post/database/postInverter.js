import Inverter from "../../../model/history/inverter.js";
/**
 * @description mengirim data ke database inverter
 * @param {*} params query sequelize
 */

const postInverter = async (params) => {
  try {
    await Inverter.create(params);
  } catch (error) {
    throw ("error Inverter :", error);
  }
};

export default postInverter;
