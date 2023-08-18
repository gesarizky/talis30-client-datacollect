import getAllRack from "./database/getAllRack.js";
import getMPPT from "./axios/getMPPT.js";

const mainMppt = async () => {
  try {
    const response = await getAllRack();
    if (!(response == 0)) {
      const resultData = [];
      for (let i = 0; i < response.length; i++) {
        const url = "http://" + response[i].mppt_ip + "/get-data";
        const uuid = response[i].uuid_user;
        const rack = response[i].rack_sn;
        // const data = await getMPPT(url, uuid, rack);
        resultData.push(data);
      }
      return resultData;
    }
  } catch (error) {
    throw ("error mainMppt :", error);
  }
};
export default mainMppt;
