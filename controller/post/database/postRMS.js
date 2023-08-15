import RMS from "../../../model/history/rms.js";
const postRMS = async (params) => {
  try {
    const data = await RMS.create(params);
    return data;
  } catch (error) {
    throw ("error postRMS :", error);
  }
};

export default postRMS;
