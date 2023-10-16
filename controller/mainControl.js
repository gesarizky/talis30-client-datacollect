import * as cron from "node-cron";
import getInterval from "./get/database/getInterval.js";
import mainRms from "./get/mainRms.js";
import mainInverter from "./get/mainInverter.js";
import mainMppt from "./get/mainMppt.js";
import mainProcessRMS from "./process/mainProcessRMS.js";
import mainRealtime from "./post/mainRealtime.js";
import postToServer from "./post/axios/postToServer.js";
import Interval from "../model/settings/interval.js";

/**
 * @description kontrol utama mengirim data device ke server graphql
 * @returns mengembalikan task
 */

const mainControl = async () => {
  try {
    const intervalCount = await Interval.count();
    if (intervalCount === 0) {
      await Interval.upsert({ device: "rms", post_interval: 5 });
      await Interval.upsert({ device: "inverter", post_interval: 5 });
      await Interval.upsert({ device: "mppt", post_interval: 5 });
      console.log("Data default Interval is Inserted.");
    } else {
      console.log("Data interval is ready");
    }
    let queryrms = { where: { device: "rms" } };
    let dataintervalrms = await getInterval(queryrms);
    let queryinverter = { where: { device: "inverter" } };
    let dataintervalinverter = await getInterval(queryinverter);
    let querymppt = { where: { device: "mppt" } };
    let dataintervalmppt = await getInterval(querymppt);
    const dataRMS = await mainRms();
    const dataInverter = await mainInverter();
    //   console.log("data mainControl datainterval: ", datainterval.post_interval);
    var taskRMS = cron.schedule(
      `*/${dataintervalrms.post_interval} * * * *  `,
      async () => {
        if (dataRMS != undefined) {
          dataRMS.forEach(async (element) => {
            // console.log("data mainControl rms element: data masuk");
            await postToServer(element, "RMS", element.UUID_User);
          });
        }
      },
      {
        scheduled: false,
      }
    );

    var taskInverter = cron.schedule(
      `*/${dataintervalinverter.post_interval} * * * *  `,
      async () => {
        // const dataInverter = await mainInverter();
        if (dataInverter != undefined) {
          dataInverter.forEach(async (element) => {
            // console.log("data mainControl inverter element:", element);
            await postToServer(element, "Inverter", element.UUID_User);
          });
        }
      },
      {
        scheduled: false,
      }
    );

    var taskMPPT = cron.schedule(
      `*/${dataintervalmppt.post_interval} * * * *  `,
      async () => {
        const dataMPPT = await mainMppt();
        if (dataMPPT != undefined) {
          dataMPPT.forEach(async (element) => {
            // console.log("data mainControl mppt element: data masuk");
            await postToServer(element, "MPPT", element.UUID_User);
          });
        }
      },
      {
        scheduled: false,
      }
    );

    var taskRealtime = cron.schedule(
      `* * * * * *  `,
      async () => {
        if (dataRMS != undefined) {
          dataRMS.forEach(async (element) => {
            if (element.code != 404) {
              let [dataContent, dataHealth] = await mainProcessRMS(element);
              const data = `{ health: ${dataHealth}, content: ${dataContent}, rack_sn: ${element.rack_sn}}`;
              await mainRealtime(data, element.UUID_User, element.rms_sn, "");
            }
          });
        }
      },
      {
        scheduled: false,
      }
    );

    var taskRealtimeRms = cron.schedule(
      `* * * * * *  `,
      async () => {
        if (dataRMS != undefined) {
          dataRMS.forEach(async (element) => {
            if (element.code != 404) {
              await mainRealtime(
                element,
                element.UUID_User,
                element.rms_sn,
                "RMS"
              );
            }
          });
        }
      },
      {
        scheduled: false,
      }
    );

    var taskRealtimeInverter = cron.schedule(
      `* * * * * *  `,
      async () => {
        if (dataInverter != undefined) {
          dataInverter.forEach(async (element) => {
            if (element.code != 404) {
              await mainRealtime(
                element,
                element.UUID_User,
                element.inverter_sn,
                "Inverter"
              );
            }
          });
        }
      },
      {
        scheduled: false,
      }
    );

    return [
      taskRMS,
      taskInverter,
      taskMPPT,
      taskRealtime,
      taskRealtimeRms,
      taskRealtimeInverter,
    ];
  } catch (error) {
    console.log("error mainControl :", error);
  }
};

export default mainControl;
