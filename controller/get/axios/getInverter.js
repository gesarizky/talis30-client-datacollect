import axios from "axios";
import InverterModel from "../../../model/respons/InverterModel.js";
import InverterBaseModel from "../../../model/respons/InverterBaseModel.js";

const getInverter = async (url, datauser, datarack) => {
  let data;
  try {
    const respons = await axios.get(url, { timeout: 5000 });
    data = new InverterBaseModel(respons.data);
    data.code = 200;
    data.UUID_User = datauser;
    data.rack_sn = datarack;
    return data;
  } catch (error) {
    data = new InverterBaseModel({});
    data.code = 404;
    data.UUID_User = datauser;
    data.rack_sn = datarack;
    return data;
  }
};
export default getInverter;
