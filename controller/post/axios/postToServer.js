import axios from "axios";
import dotenv from "dotenv";
import sendLocalToServer from "./sendLocalToServer.js";
import formatObject from "../../../model/function/formatObject.js";
import postToLocal from "../database/postToLocal.js";
import toIsoString from "./toIsoString.js";
import InverterModel from "../../../model/respons/InverterModel.js";
import MPPTModel from "../../../model/respons/MPPTModel.js";
import RMS from "../../../model/history/rms.js";
import Inverter from "../../../model/history/inverter.js";
import MPPTHISTORY from "../../../model/history/mppt.js";

dotenv.config();
let sendLocalToServerCalled = false;

/**
 * @description mengirim data device ke server graphql
 * @param {*} data data device
 * @param {String} label device
 * @param {String} uuid_user uuid_user
 * @param {Date} local timestamp local database
 */

const postToServer = async (data, label, uuid_user, local) => {
  try {
    let dataFormat;
    if (data.code != "404") {
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
        dataFormat = `rack_sn: ${data.rack_sn}, rms_sn: ${data.rms_sn},cms_data: [ ${dataRMS} ]`;
      } else if (label == "Inverter") {
        // console.log("data raw :",data);
        let newdata = new InverterModel(data.inverter_data);
        let dataInverter = "{" + formatObject(newdata) + "}";
        dataFormat = `rack_sn: ${data.rack_sn}, inverter_sn: ${data.inverter_sn},inverter_data: [ ${dataInverter} ]`;
      } else {
        let newdata = new MPPTModel(data.mppt_data);
        let dataMPPT = "{" + formatObject(newdata) + "}";
        dataFormat = `rack_sn: ${data.rack_sn},  mppt_sn: ${data.mppt_sn},mppt_data: [ ${dataMPPT} ]`;
      }
    } else {
      if (label == "RMS")
        dataFormat = `rack_sn: ${data.rack_sn}, rms_sn: ${data.rms_sn}, cms_data: []`;
      else if (label == "Inverter")
        dataFormat = `rack_sn: ${data.rack_sn}, inverter_sn: ${data.inverter_sn},inverter_data: []`;
      else
        dataFormat = `rack_sn: ${data.rack_sn}, mppt_sn: ${data.mppt_sn},mppt_data: []`;
    }
    // console.log("local :", local);
    const dt = local instanceof Date ? local : new Date();
    const timestamp = await toIsoString(dt);
    // console.log("dt :", dt);
    // console.log("timestamp :", timestamp);

    const url = process.env.URL_HASURA;
    const query = `mutation ($UUID_User: String = "${uuid_user}", $data: json = {${dataFormat}}) {
                insert_${label}_one(object: {UUID_User: $UUID_User, data: $data ,timestamp: "${timestamp}"}) {
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
        const mpptCount = await MPPTHISTORY.count();
        if (
          !sendLocalToServerCalled &&
          (rmsCount !== 0 || inverterCount !== 0 || mpptCount !== 0)
        ) {
          sendLocalToServerCalled = true;
          await sendLocalToServer();
        }
      })
      .catch(async (error) => {
        console.log(
          "🚀 ~ file: postToServer.js: ~ postToServer ~ error:"
          //   error
        );
        await postToLocal(data, label, uuid_user);
        sendLocalToServerCalled = false;
      });
  } catch (error) {
    console.log("error : postToServer :", error);
    return "error";
  }
};

export default postToServer;
