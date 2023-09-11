import axios from "axios";
import RMSModel from "../../../model/respons/RMSModel.js";

/**
 * @description fetching atau pengambilan data device RMS dan di destructuring
 * @param {String} url alamat ip device rms
 * @param {String} datauser uuid_user
 * @param {String} datarack rack_sn
 * @param {Sttring} datasn rms_sn
 * @returns data yang sudah di destructuring
 */

const getRMS = async (url, datauser, datarack, datasn) => {
  let data;
  try {
    const respons = await axios.get(url, { timeout: 5000 });
    data = new RMSModel(respons.data);
    data.code = 200;
    data.UUID_User = datauser;
    data.rack_sn = datarack;
    data.rms_sn = datasn;
    return data;
  } catch (error) {
    data = new RMSModel({ cms_data: [] });
    data.code = 404;
    data.UUID_User = datauser;
    data.rack_sn = datarack;
    data.rms_sn = datasn;
    return data;
  }
};

export default getRMS;
