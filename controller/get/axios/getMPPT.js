import axios from "axios";
import MPPTBaseModel from "../../../model/respons/MPPTBaseModel.js";

/**
 *@description fetching atau pengambilan data device MPPT dan di destructuring  
 * @param {String} url alamat ip device mppt
 * @param {String} datauser uuid_user
 * @param {String} datarack rack_sn
 * @param {String} datasn mppt_sn
 * @returns data yang sudah di destructuring
 */
const getMPPT = async (url, datauser, datarack, datasn) => {
  let data;
  try {
    const respons = await axios.get(url, { timeout: 5000 });
    if (respons.data.connected_module == 0) {
      throw new Error();
    }
    data = new MPPTBaseModel(respons.data);
    data.code = 200;
    data.UUID_User = datauser;
    data.rack_sn = datarack;
    data.mppt_sn = datasn;
    return data;
  } catch (error) {
    data = new MPPTBaseModel({
      mppt_data: [],
    });
    data.code = 404;
    data.UUID_User = datauser;
    data.rack_sn = datarack;
    data.mppt_sn = datasn;
    return data;
  }
};
export default getMPPT;
