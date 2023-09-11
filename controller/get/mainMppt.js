import getAllRack from "./database/getAllRack.js";
import getMPPT from "./axios/getMPPT.js";
import MPPT from "../../model/settings/Mppt.js";

/**
 * @description fetching dan menampilkan data tiap device MPPT yang ada di database
 * @returns hasil semua proses dari MPPT 
 */

const mainMppt = async () => {
  try {
    const query = { include: [{ model: MPPT, as: "mppt" }] };
    const response = await getAllRack(query);
    if (!(response == 0)) {
      const resultData = [];
      for (let i = 0; i < response.length; i++) {
        const mpptList = response[i].mppt; // Access the array of mppt
        for (let j = 0; j < mpptList.length; j++) {
          const mpptIp = mpptList[j].mppt_ip; // Access mppt_ip for each element
          const url = `http://${mpptIp}/get-data`;
          // const url = `http://${mpptIp}`;
          const uuid = response[i].uuid_user;
          const rack = response[i].rack_sn;
          const sn = mpptList[j].mppt_sn;
          const data = await getMPPT(url, uuid, rack, sn);
          resultData.push(data);
        }
      }
      return resultData;
    }
  } catch (error) {
    throw ("error mainMppt :", error);
  }
};
export default mainMppt;
