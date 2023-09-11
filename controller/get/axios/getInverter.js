import axios from "axios";
import InverterBaseModel from "../../../model/respons/InverterBaseModel.js";

/**
 * @description fetching atau pengambilan data device inverter dan di destructuring
 * @param {String} url alamat ip device inverter
 * @param {String} datauser uuid_user
 * @param {String} datarack rack_sn
 * @param {String} datasn inverter_sn
 * @returns data yang sudah di destructuring
 */

const getInverter = async (url, datauser, datarack,datasn) => {
  let data;
  try {
    const respons = await axios.get(url, { timeout: 5000 });
    data = new InverterBaseModel(respons.data);
    data.code = 200;
    data.UUID_User = datauser;
    data.rack_sn = datarack;
    data.inverter_sn = datasn;
    return data;
  } catch (error) {
    data = new InverterBaseModel({});
    data.code = 404;
    data.UUID_User = datauser;
    data.rack_sn = datarack;
    data.inverter_sn = datasn;
    return data;
  }
};
export default getInverter;
