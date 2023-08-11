import axios from "axios";
// import deleteTimestampPost from "../delete/deleteTimestampPost";
// import storeTimestampPost from "../store/storeTimestampPost";
import formatObject from "../../../model/function/formatObject.js";
// import storeTimestampAlert from "../store/storeTimestampAlert";
import dotenv from "dotenv";
import InverterModel from "../../../model/respons/InverterModel.js";
dotenv.config();

const postToServer = async (data, label, uuid_user, id, dataFrom) => {
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

    // const queryStore = { label: label, data: data };
    // const queryDelete = { where: { id: id } };
    axios
      .post(url, { query }, { headers: { "Content-Type": "application/json" } })
      .then(async (response) => {
        console.log(
          "🚀 ~ file: postToServer.js:37 ~ .then ~ response:",
          response.status
        );
        // ! Handle the response data
        // if (dataFrom == "database" && response.status == 200) {
        //     await deleteTimestampPost(queryDelete);
        // }
      })
      .catch(async (error) => {
        console.log(
          "🚀 ~ file: postToServer.js:44 ~ postToServer ~ error:",
          error
        );
        // ! Handle any errors
        // if (dataFrom != "database") {
        //     await storeTimestampPost(queryStore)
        // }
      });
    return;
  } catch (error) {
    console.log("error CTPP-404 postToServer :", error);
    // await storeTimestampAlert({ data: "CTPP-404" })
    return "error";
  }
};

export default postToServer;
