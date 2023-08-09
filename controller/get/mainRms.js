import getAllRack from "./database/getAllRack.js";
import getRMS from "./axios/getRMS.js";
const mainRms = async () => {
  try {
    const response = await getAllRack();
    if (!(response == 0)) {
      const resultData = [];
      for (let i = 0; i < response.length; i++) {
        const url = "http://" + response[i].rms_ip + "/get-cms-data";
        const uuid = response[i].uuid_user;
        const rack = response[i].rack_sn;
        const data = await getRMS(url, uuid, rack);
        resultData.push(data);
      }
      return resultData;
    }
  } catch (error) {
    throw ("error mainRms :", error);
  }
};

export default mainRms;
