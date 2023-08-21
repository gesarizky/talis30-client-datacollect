import postToServer from "./postToServer.js";
import getLocalInverter from "../../get/database/getLocalInverter.js";
import getLocalRMS from "../../get/database/getLocalRms.js";
import getLocalMPPT from "../../get/database/getLocalMPPT.js";
import RMS from "../../../model/history/rms.js";
import Inverter from "../../../model/history/inverter.js";
import MPPTHISTORY from "../../../model/history/mppt.js";

const sendLocalToServer = async () => {
  const dataRMS = await getLocalRMS();
  if (dataRMS != undefined) {
    for (const element of dataRMS) {
      try {
        await postToServer(element.data, "RMS", element.UUID_User);
        await RMS.destroy({ where: { id: element.id } });
        console.log(
          "🚀 ~ file: sendLocalToServer.js RMS ~ .then ~ response:",
          200
        );
      } catch (err) {
        console.log(
          "🚀 ~ file: sendLocalToServer.js RMS ~ .then ~ error:",
          err
        );
      }
    }
  }
  const dataInverter = await getLocalInverter();
  if (dataInverter != undefined) {
    for (const element of dataInverter) {
      try {
        await postToServer(element.data, "Inverter", element.UUID_User);
        await Inverter.destroy({ where: { id: element.id } });
        console.log(
          "🚀 ~ file: sendLocalToServer.js inverter ~ .then ~ response:",
          200
        );
      } catch (err) {
        console.log(
          "🚀 ~ file: sendLocalToServer.js inverter ~ .then ~ error:",
          err
        );
      }
    }
  }
  const dataMPPT = await getLocalMPPT();
  if (dataMPPT != undefined) {
    for (const element of dataMPPT) {
      try {
        await postToServer(element.data, "MPPT", element.UUID_User);
        await MPPTHISTORY.destroy({ where: { id: element.id } });
        console.log(
          "🚀 ~ file: sendLocalToServer.js MPPT ~ .then ~ response:",
          200
        );
      } catch (err) {
        console.log(
          "🚀 ~ file: sendLocalToServer.js MPPT ~ .then ~ error:",
          err
        );
      }
    }
  }
};
export default sendLocalToServer;
