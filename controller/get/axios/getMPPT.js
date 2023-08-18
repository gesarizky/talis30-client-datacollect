import axios from "axios";
const getMPPT = async (url, datauser, datarack) => {
  let data;
  try {
    const respons = await axios.get(url, { timeout: 5000 });
    // data = new RMSModel(respons.data);
    data.code = 200;
    data.UUID_User = datauser;
    data.rack_sn = datarack;
    return data;
  } catch (error) {
    // data = new RMSModel({ mppt_data: [] });
    data.code = 404;
    data.UUID_User = datauser;
    data.rack_sn = datarack;
    return data;
  }
};
export default getMPPT;
