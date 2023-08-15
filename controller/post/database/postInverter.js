import Inverter from "../../../model/history/inverter.js";
const postInverter = async (params) => {
  try {
    const data = await Inverter.create(params);
    return data;
  } catch (error) {
    throw ("error Inverter :", error);
  }
};

export default postInverter;
