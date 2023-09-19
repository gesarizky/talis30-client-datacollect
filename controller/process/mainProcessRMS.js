// import ConfigCms from "@/models/settings/ConfigCms";
// import getParamsCMS from "../../get/database/getParamsCMS";
import ParamsModel from "../../model/respons/ParamsModel.js";
import cellContent from "./analytic/cellContent.js";
import getOneRms from "../get/database/getOneRms.js";

const mainProcessRMS = async (RMSData) => {
  //   console.log(
  //     "🚀 ~ file: mainProcessRMS.js:8 ~ mainProcessRMS ~ RMSData:",
  //     RMSData
  //   );
  try {
    if (RMSData.code != "404") {
      const query = {
        where: { rms_sn: RMSData.rms_sn },
        attributes: ["config"],
      };
      const param = await getOneRms(query);
      const modelParams = new ParamsModel(param);
      const indexUnusedZeroBased = modelParams.cellNotUsed
        .split(",")
        .map((element) => Number(element) - 1)
        .join(",");
      const dataCell = [];

      RMSData.cms_data.forEach(async (element) => {
        //TODO add data N/A
        if (element.frame_name != "FRAME-32-NA") {
          //   console.log("Data cms_data :", element);
          const vcell = element.vcell;
          //   const vpack = Math.round(
          //     (element.pack[0] + element.pack[1] + element.pack[2]) / 1000
          //   );

          //TODO Temp allert Concept

          const filteredVcell = vcell.filter(
            (_, index) => !indexUnusedZeroBased.includes(index)
          );

          //   console.log("data filter vcell :", filteredVcell);
          const minVcell = Math.min(...filteredVcell);
          const maxVcell = Math.max(...filteredVcell);
          // console.log(`data minVcell : ${minVcell}, maxVcell : ${maxVcell}`);

          dataCell.push(minVcell, maxVcell);
        }
      });
      //   console.log(`datacell : ${dataCell}`);
      //TODO frame name low cell
      const [content, health] = await cellContent(dataCell, modelParams);
      return [content, health];
    } else {
      console.log("error : rms code : 404 ");
    }
  } catch (error) {
    console.log("error : ~ file mainProcessRms.js : ", error);
    return [undefined, undefined];
  }
};

export default mainProcessRMS;
