import Interval from "../../../model/settings/interval.js";
const getInterval = async (params) => {
  try {
    const data = await Interval.findOne(params);
    return data;
  } catch (error) {
    throw ("error getInterval :", error);
  }
};

export default getInterval;
