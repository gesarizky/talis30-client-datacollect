import MPPTHISTORY from "../../../model/history/mppt.js";

/**
 * @description mengirim data ke database MPPT
 * @param {*} params query sequelize
 */

const postMPPT = async (params) => {
  try {
    await MPPTHISTORY.create(params);
  } catch (error) {
    throw ("error postMPPT :", error);
  }
};

export default postMPPT;
