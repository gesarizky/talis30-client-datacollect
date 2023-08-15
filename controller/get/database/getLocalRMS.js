import RMS from "../../../model/history/rms.js";
const getLocalRMS = async () => {
    try {
      const data = await RMS.findAll();
      return data;
    } catch (error) {
      throw ("error getLocalRMS.js :", error);
    }
};
export default getLocalRMS;