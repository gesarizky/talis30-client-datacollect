import realtimeToServer from "./axios/realtimeToServer.js";
import formatObject from "../../model/function/formatObject.js";
import InverterModel from "../../model/respons/InverterModel.js";
/**
 * @description membuat struktur baru dari data realtime
 * @param {Number} health nilai health batere
 * @param {Number} content nilai content batere
 * @param {String} uuid_user nilai uuid user
 * @param {String} rack_sn nilai rack sn
 * @param {String} rms_sn nilai rms sn
 */

const mainRealtime = async (data, uuid_user, device_sn, label) => {
  try {
    let dataformat = "";
    if (label == "") dataformat = data;
    if (label == "RMS") {
      let dataRMS = "";
      if (!(data.cms_data == 0)) {
        for (let i = 0; i < data.cms_data.length; i++) {
          if (data.cms_data[i].frame_name != "FRAME-32-NA")
            if (i == data.cms_data.length - 1)
              dataRMS += "{" + formatObject(data.cms_data[i]) + "}";
            else dataRMS += "{" + formatObject(data.cms_data[i]) + "},";
        }
      }
      dataformat = `{cms_data: [ ${dataRMS} ],rack_sn: ${data.rack_sn}}`;
    }
    if (label == "Inverter") {
      let newdata = new InverterModel(data.inverter_data);
      let dataInverter = "{" + formatObject(newdata) + "}";
      dataformat = `{rack_sn: ${data.rack_sn},inverter_data: [ ${dataInverter} ]}`;
      // console.log(dataformat);
    }
    await realtimeToServer(dataformat, uuid_user, device_sn, label);
  } catch (error) {
    console.log("error : file : ~ mainRealtime.js : ", error);
  }
};

export default mainRealtime;
