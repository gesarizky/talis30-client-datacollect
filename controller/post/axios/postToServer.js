import axios from "axios";
import dotenv from "dotenv";
import sendLocalToServer from "./sendLocalToServer.js";
import formatObject from "../../../model/function/formatObject.js";
import postToLocal from "../database/postToLocal.js";
import InverterModel from "../../../model/respons/InverterModel.js";
import RMS from "../../../model/history/rms.js";
import Inverter from "../../../model/history/inverter.js";
dotenv.config();

const postToServer = async (data, label, uuid_user) => {
  try {
    let dataFormat;
    if (data.code != "404") {
      if (label == "RMS") {
        let dataRMS = "";
        if (!(data.cms_data == 0)) {
          for (let i = 0; i < data.cms_data.length; i++) {
            if (data.cms_data[i].frame_name != "N/A")
              if (i == data.cms_data.length - 1)
                dataRMS += "{" + formatObject(data.cms_data[i]) + "}";
              else dataRMS += "{" + formatObject(data.cms_data[i]) + "},";
          }
        }
        dataFormat = `rack_sn: ${data.rack_sn}, cms_data: [ ${dataRMS} ]`;
      } else {
        // console.log("data raw :",data);
        let newdata = new InverterModel(data.inverter_data);
        let dataInverter = "{" + formatObject(newdata) + "}";
        dataFormat = `rack_sn: ${data.rack_sn}, inverter_data: [ ${dataInverter} ]`;
      }
    } else {
      if (label == "RMS") dataFormat = `rack_sn: ${data.rack_sn}, cms_data: []`;
      else dataFormat = `rack_sn: ${data.rack_sn}, inverter_data: []`;
    }

    // console.log("data format :", dataFormat);

    const url = process.env.URL_HASURA;
    const query = `mutation ($UUID_User: String = "${uuid_user}", $data: json = {${dataFormat}}) {
                insert_${label}_one(object: {UUID_User: $UUID_User, data: $data}) {
                    id
                }
            }`;

    axios
      .post(url, { query }, { headers: { "Content-Type": "application/json" } })
      .then(async (response) => {
        console.log(
          "🚀 ~ file: postToServer.js: ~ .then ~ response:",
          response.status
        );
        const rmsCount = await RMS.count();
        const inverterCount = await Inverter.count();
        if (rmsCount !== 0 || inverterCount !== 0) {
          await sendLocalToServer();
        }
      })
      .catch(async (error) => {
        console.log(
          "🚀 ~ file: postToServer.js: ~ postToServer ~ error:"
          //   error
        );
        await postToLocal(data, label, uuid_user);
      });
    return;
  } catch (error) {
    console.log("error : postToServer :", error);
    return "error";
  }
};

export default postToServer;
