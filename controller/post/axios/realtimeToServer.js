import axios from "axios";
import dotenv from "dotenv";
import toIsoString from "./toIsoString.js";
dotenv.config();

async function fetchDataByData(uuid_user) {
  const url = process.env.URL_HASURA;
  const query = `query {
        Realtime(where: {UUID_User: {_eq: "${uuid_user}"}}, limit: 1) {
            UUID_User
        }
    }`;

  try {
    const response = await axios.post(
      url,
      { query },
      { headers: { "Content-Type": "application/json" } }
    );
    // console.log("data response :", response.data.data.Realtime.length);
    return response.data.data.Realtime.length;
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
    return null;
  }
}

const realtimeToServer = async (data, uuid_user) => {
  try {
    const url = process.env.URL_HASURA;
    const existingData = await fetchDataByData(uuid_user);
    const date = new Date();
    const timestamp = await toIsoString(date);

    if (existingData) {
      const query = `mutation ($_eq: String = "${uuid_user}", $updatedAt: timestamptz = "${timestamp}", $data: json = ${data}) {
                update_Realtime(where: {UUID_User: {_eq: $_eq}}, _set: {updatedAt: $updatedAt, data: $data}) {
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
        return "success";
      } catch (error) {
        console.error("Failed to fetch data:", error);
        return null;
      }
    } else {
      const query = `mutation ($UUID_User: String = "${uuid_user}", $data: json = ${data},$updatedAt: timestamptz = "${timestamp}") {
                            insert_Realtime_one(object: {UUID_User: $UUID_User, data: $data, updatedAt: $updatedAt}) {
                        UUID_User
                    }
                }`;
      try {
        await axios.post(
          url,
          { query },
          { headers: { "Content-Type": "application/json" } }
        );
        return "success";
      } catch (error) {
        console.error("Failed to fetch data:", error.message);
        return null;
      }
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: realtimeToServer.js:54 ~ realtimeToServer ~ error:",
      error
    );
    return "error";
  }
};

export default realtimeToServer;
