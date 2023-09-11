import RMS from "../../../model/history/rms.js";

/**
 * @description mengambil semua data dari database RMS
 * @returns hasil findAll
 */

const getLocalRMS = async () => {
    try {
      const data = await RMS.findAll();
      return data;
    } catch (error) {
      throw ("error getLocalRMS.js :", error);
    }
};
export default getLocalRMS;