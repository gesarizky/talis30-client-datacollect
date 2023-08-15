import Inverter from "../../../model/history/inverter.js";
const getLocalInverter = async () => {
    try {
      const data = await Inverter.findAll();
      return data;
    } catch (error) {
      throw ("error getLocalInverter.js :", error);
    }
}
export default getLocalInverter;