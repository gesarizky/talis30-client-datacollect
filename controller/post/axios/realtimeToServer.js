import axios from "axios";
import dotenv from "dotenv";
import toIsoString from "./toIsoString.js";
dotenv.config();

/**
 * @description mengambil data rms dari graphql
 * @param {String} rms_sn serial number rms
 * @returns panjang data
 */
async function fetchDataByData(rms_sn, value) {
  const url = process.env.URL_HASURA;
  const query = `query {
        Realtime${value}(where: {rms_sn: {_eq: "${rms_sn}"}}, limit: 1) {
            rms_sn
        }
    }`;

  try {
    const response = await axios.post(
      url,
      { query },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data.data[`Realtime${value}`].length;
  } catch (error) {
    console.error("Failed to fetch data fetchDataByData:", error.message);
    return null;
  }
}

/**
 * @description mengirimkan data realtime ke server graphql
 * @param {Object} data data realtime device rms
 * @param {String} uuid_user uuid user device rms
 * @param {String} rms_sn rms sn device rms
 */

const realtimeToServer = async (data, uuid_user, rms_sn, label) => {
  try {
    let value = "";
    if (label == "") value = "";
    if (label == "RMS") value = "_RMS";
    if (label == "Inverter") value = "_Inverter";

    const url = process.env.URL_HASURA;
    const existingData = await fetchDataByData(rms_sn, value);
    const date = new Date();
    const timestamp = await toIsoString(date);

    if (existingData) {
      const query = `mutation ($_eq: String = "${rms_sn}", $updatedAt: timestamptz = "${timestamp}", $data: json = ${data}, $UUID_User: String = "${uuid_user}") {
                  update_Realtime${value}(where: {rms_sn: {_eq: $_eq}}, _set: {updatedAt: $updatedAt, data: $data, UUID_User:$UUID_User}) {
                      returning {
                          updatedAt
                      }
                  }
              }`;
      try {
        await axios.post(
          url,
          { query },
          { headers: { "Content-Type": "application/json" } }
        );
      } catch (error) {
        console.error("Failed to fetch data update_Realtime:", error);
      }
    } else {
      const query = `mutation ($UUID_User: String = "${uuid_user}", $data: json = ${data},$updatedAt: timestamptz = "${timestamp}",$rms_sn: String = "${rms_sn}") {
                              insert_Realtime${value}_one(object: {UUID_User: $UUID_User, data: $data, updatedAt: $updatedAt, rms_sn:$rms_sn}) {
                          rms_sn
                      }
                  }`;
      try {
        await axios.post(
          url,
          { query },
          { headers: { "Content-Type": "application/json" } }
        );
      } catch (error) {
        console.error(
          "Failed to fetch data insert_Realtime_one:",
          error.message
        );
      }
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: realtimeToServer.js: ~ realtimeToServer ~ error:",
      error.message
    );
  }
};

export default realtimeToServer;
