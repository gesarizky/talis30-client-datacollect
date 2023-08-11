import * as cron from "node-cron";
import getInterval from "./get/database/getInterval.js";
import mainRms from "./get/mainRms.js";
import mainInverter from "./get/mainInverter.js";
import postToServer from "./post/axios/postToServer.js";

const mainControl = async () => {
  const dataRMS = await mainRms();
  const dataInverter = await mainInverter();
  let queryrms = { where: { device: "rms" } };
  let dataintervalrms = await getInterval(queryrms);
  let queryinverter = { where: { device: "inverter" } };
  let dataintervalinverter = await getInterval(queryinverter);
  //   console.log("data mainControl datainterval: ", datainterval.post_interval);
  var taskRMS = cron.schedule(
    `*/${dataintervalrms.post_interval} * * * * *`,
    async () => {
      if (dataRMS != undefined) {
        dataRMS.forEach(async (element) => {
          // console.log("data mainControl rms element: data masuk");
            await postToServer(element, "RMS", element.UUID_User, "", "");
        });
      }
    },
    {
      scheduled: false,
    }
  );

  var taskInverter = cron.schedule(
    `*/${dataintervalinverter.post_interval} * * * * *`,
    async () => {
      if (dataRMS != undefined) {
        dataInverter.forEach(async (element) => {
          // console.log("data mainControl inverter element:", element);
          await postToServer(element, "Inverter", element.UUID_User, "", "");
        });
      }
    },
    {
      scheduled: false,
    }
  );


  return [taskRMS,taskInverter];
};

export default mainControl;
