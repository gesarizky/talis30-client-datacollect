import realtimeToServer from "./axios/realtimeToServer.js";
/**
 * @description membuat struktur baru dari data realtime
 * @param {Number} health nilai health batere
 * @param {Number} content nilai content batere
 * @param {String} uuid_user nilai uuid user
 * @param {String} rack_sn nilai rack sn
 * @param {String} rms_sn nilai rms sn
 */

const mainRealtime = async (health, content, uuid_user, rack_sn, rms_sn) => {
  try {
    const data = `{ health: ${health}, content: ${content}, rack_sn: ${rack_sn}}`;
    await realtimeToServer(data, uuid_user, rms_sn);
  } catch (error) {
    console.log("error : file : ~ mainRealtime.js : ", error);
  }
};

export default mainRealtime;
