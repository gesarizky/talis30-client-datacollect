import axios from "axios";
import dotenv from "dotenv";
import toIsoString from "./toIsoString.js";
dotenv.config();

/**
 * @description mengambil data rms dari graphql
 * @param {String} rms_sn serial number rms
 * @returns panjang data
 */
async function fetchDataByData(device_sn, device, key) {
  const url = process.env.URL_HASURA;
  const query = `query {
        Realtime${device}(where: {${key}: {_eq: "${device_sn}"}}, limit: 1) {
            ${key}
        }
    }`;

  try {
    const response = await axios.post(
      url,
      { query },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data.data[`Realtime${device}`].length;
  } catch (error) {
    console.error("Failed to fetch data fetchDataByData:", error.message);
    return null;
  }
}

/**
 * @description mengirimkan data realtime ke server graphql
 * @param {Object} data data realtime device rms
 * @param {String} uuid_user uuid user device rms
 * @param {String} device_sn rms sn device rms
 */

const realtimeToServer = async (data, uuid_user, device_sn, label) => {
  try {
    let device = "";
    let key = "";
    if (label == "") {
      device = "";
      key = "rms_sn";
    }
    if (label == "RMS") {
      device = "_RMS";
      key = "rms_sn";
    }
    if (label == "Inverter") {
      device = "_Inverter";
      key = "inverter_sn";
    }

    const url = process.env.URL_HASURA;
    const existingData = await fetchDataByData(device_sn, device, key);
    const date = new Date();
    const timestamp = await toIsoString(date);

    if (existingData) {
      const query = `mutation ($_eq: String = "${device_sn}", $updatedAt: timestamptz = "${timestamp}", $data: json = ${data}, $UUID_User: String = "${uuid_user}") {
                  update_Realtime${device}(where: {${key}: {_eq: $_eq}}, _set: {updatedAt: $updatedAt, data: $data, UUID_User:$UUID_User}) {
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
      const query = `mutation ($UUID_User: String = "${uuid_user}", $data: json = ${data},$updatedAt: timestamptz = "${timestamp}",$device_sn: String = "${device_sn}") {
                              insert_Realtime${device}_one(object: {UUID_User: $UUID_User, data: $data, updatedAt: $updatedAt, ${key}:$device_sn}) {
                          ${key}
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
