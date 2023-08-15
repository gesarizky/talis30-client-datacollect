import postToServer from "./postToServer.js";
import getLocalInverter from "../../get/database/getLocalInverter.js";
import getLocalRMS from "../../get/database/getLocalRms.js";
import RMS from "../../../model/history/rms.js";
import Inverter from "../../../model/history/inverter.js";

const sendLocalToServer = async () => {
  const dataRMS = await getLocalRMS();
  if (dataRMS != undefined) {
    dataRMS.forEach(async (element) => {
      //   console.log("data mainControl rms element: ", element);
      await postToServer(element.data, "RMS", element.UUID_User)
        .then(async () => {
          await RMS.destroy({ where: { id: element.id } });
          console.log(
            "🚀 ~ file: sendLocalToServer.js RMS ~ .then ~ response:",
            200
          );
        })
        .catch((err) => {
          console.log(
            "🚀 ~ file: sendLocalToServer.js RMS ~ .then ~ error:",
            err
          );
        });
    });
  }
  const dataInverter = await getLocalInverter();
  if (dataInverter != undefined) {
    dataInverter.forEach(async (element) => {
      //   console.log("data mainControl inverter element:", element);
      await postToServer(element.data, "Inverter", element.UUID_User)
        .then(async () => {
          await Inverter.destroy({ where: { id: element.id } });
          console.log(
            "🚀 ~ file: sendLocalToServer.js inverter ~ .then ~ response:",
            200
          );
        })
        .catch((err) => {
          console.log(
            "🚀 ~ file: sendLocalToServer.js inverter ~ .then ~ error:",
            err
          );
        });
    });
  }
};
export default sendLocalToServer;
