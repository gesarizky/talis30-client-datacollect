import realtimeToServer from "./axios/realtimeToServer.js";

const mainRealtime = async (health, content, uuid_user, rack_sn, rms_sn) => {
  try {
    const data = `{ health: ${health}, content: ${content}, rack_sn: ${rack_sn}, rms_sn: ${rms_sn}}`;
    await realtimeToServer(data, uuid_user);

    return "success";
  } catch (error) {
    console.log("error : file : ~ mainRealtime.js : ", error);
    return "error";
  }
};

export default mainRealtime;
