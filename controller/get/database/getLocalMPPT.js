import MPPTHISTORY from "../../../model/history/mppt.js";

/**
 * @description mengambil semua data dari database MPPt
 * @returns hasil findAll
 */

const getLocalMPPT = async () => {
    try {
      const data = await MPPTHISTORY.findAll();
      return data;
    } catch (error) {
      throw ("error getLocalMPPT.js :", error);
    }
}
export default getLocalMPPT;