import MPPTHISTORY from "../../../model/history/mppt.js";
const postMPPT = async (params) => {
  try {
    const data = await MPPTHISTORY.create(params);
    return data;
  } catch (error) {
    throw ("error postMPPT :", error);
  }
};

export default postMPPT;
