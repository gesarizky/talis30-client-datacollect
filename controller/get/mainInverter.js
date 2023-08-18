import Inverter1 from "../../model/settings/Inverter.js";
import getAllRack from "./database/getAllRack.js";
import getInverter from "./axios/getInverter.js";
const mainInverter = async () => {
  try {
    const query = { include: [{ model: Inverter1, as: "inverter" }] };
    const response = await getAllRack(query);
    if (!(response == 0)) {
      const resultData = [];
      for (let i = 0; i < response.length; i++) {
        const inverterList = response[i].inverter; // Access the array of inverter
        for (let j = 0; j < inverterList.length; j++) {
          const inverterIp = inverterList[j].inverter_ip; // Access rms_ip for each element
          const url = `http://${inverterIp}/get-detail-data`;
          const uuid = response[i].uuid_user;
          const rack = response[i].rack_sn;
          const data = await getInverter(url, uuid, rack);
          resultData.push(data);
        }
      }
      return resultData;
    }
  } catch (error) {
    throw ("error mainRms :", error);
  }
};
export default mainInverter;
