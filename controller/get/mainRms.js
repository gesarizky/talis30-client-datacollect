import RMS1 from "../../model/settings/RMS.js";
import getAllRack from "./database/getAllRack.js";
import getRMS from "./axios/getRMS.js";

/**
 * @description fetching dan menampilkan data tiap device RMS yang ada di database
 * @returns hasil semua proses dari RMS 
 */

const mainRms = async () => {
  try {
    const query = { include: [{ model: RMS1, as: "rms" }] };
    const response = await getAllRack(query);
    if (!(response == 0)) {
      const resultData = [];
      for (let i = 0; i < response.length; i++) {
        const rmsList = response[i].rms; // Access the array of rms
        for (let j = 0; j < rmsList.length; j++) {
          const rmsIp = rmsList[j].rms_ip; // Access rms_ip for each element
          const url = `http://${rmsIp}/get-cms-data`;
          const uuid = response[i].uuid_user;
          const rack = response[i].rack_sn;
          const sn = rmsList[j].rms_sn;
          const data = await getRMS(url, uuid, rack, sn);
          resultData.push(data);
        }
      }
      return resultData;
    }
  } catch (error) {
    throw ("error mainRms :", error);
  }
};

export default mainRms;
