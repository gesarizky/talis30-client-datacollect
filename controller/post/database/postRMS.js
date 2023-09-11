import RMS from "../../../model/history/rms.js";

/**
 * @description mengirim data ke database RMS
 * @param {*} params query sequelize
 */

const postRMS = async (params) => {
  try {
    await RMS.create(params);
  } catch (error) {
    throw ("error postRMS :", error);
  }
};

export default postRMS;
