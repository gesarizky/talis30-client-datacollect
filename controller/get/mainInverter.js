import getAllRack from "./database/getAllRack.js";
import getInverter from "./axios/getInverter.js";
const mainInverter = async () => {
  try {
    const response = await getAllRack();
    if (!(response == 0)) {
      const resultData = [];
      for (let i = 0; i < response.length; i++) {
        const url = "http://" + response[i].inverter_ip + "/get-detail-data";
        const uuid = response[i].uuid_user;
        const rack = response[i].rack_sn;
        const data = await getInverter(url,uuid,rack)
        resultData.push(data);
      }
      return resultData;
    }
  } catch (error) {
    throw ("error mainRms :", error);
  }
};
export default mainInverter;
