import Inverter from "../../../model/history/inverter.js";

/**
 * @description mengambil semua data dari database inverter
 * @returns hasil findAll
 */

const getLocalInverter = async () => {
    try {
      const data = await Inverter.findAll();
      return data;
    } catch (error) {
      throw ("error getLocalInverter.js :", error);
    }
}
export default getLocalInverter;